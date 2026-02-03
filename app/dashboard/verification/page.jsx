"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../lib/api";
import Button from "../../components/ui/Button";
import { loginSuccess, AUTH_STORAGE_KEY } from "../../../store/slices/authSlice";

const inputClass =
  "w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none border border-[#2a1f14] focus:border-[#c8aa78]";
const labelClass = "mb-2 block text-sm text-gray-400";

// facingMode: "user" = front/selfie, "environment" = back (for Aadhaar)
function CameraCapture({
  shouldStartCamera,
  facingMode,
  capturedImage,
  onCapture,
  onRetake,
  label,
  description,
  mirror = false,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | starting | live | error
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!shouldStartCamera || capturedImage) return;

    let cancelled = false;
    setStatus("starting");

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          try {
            await video.play();
          } catch (playErr) {
            // play() interrupted by cleanup/new load (AbortError) – ignore; cleanup will run
            if (playErr?.name === "AbortError") return;
            if (playErr?.name === "NotAllowedError") {
              if (!cancelled) setStatus("error");
              return;
            }
            throw playErr;
          }
        }
        if (!cancelled) setStatus("live");
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setStatus("error");
          toast.error(
            err.name === "NotAllowedError"
              ? "Camera access denied. Please allow camera permission."
              : "Could not access camera. Please try again."
          );
        }
      }
    };

    start();
    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      const video = videoRef.current;
      if (video) {
        video.srcObject = null;
      }
      setStatus("idle");
    };
  }, [shouldStartCamera, capturedImage, facingMode, retry]);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || status !== "live" || !streamRef.current) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    if (mirror) {
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    if (mirror) ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        const dataUrl = canvas.toDataURL("image/jpeg");
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        video.srcObject = null;
        setStatus("idle");
        onCapture(file, dataUrl);
      },
      "image/jpeg",
      0.92
    );
  };

  if (capturedImage) {
    return (
      <div className="space-y-2">
        <label className={labelClass}>{label}</label>
        <p className="mb-2 text-xs text-gray-500">{description}</p>
        <div className="relative inline-block rounded-lg overflow-hidden border border-[#2a1f14] bg-black max-w-[320px]">
          <img
            src={capturedImage}
            alt={label}
            className="w-full h-auto object-contain max-h-72"
          />
          <button
            type="button"
            onClick={onRetake}
            className="absolute bottom-2 right-2 rounded-md bg-[#c8aa78] px-4 py-2 text-sm font-semibold text-black hover:bg-[#d6bc8c]"
          >
            Retake
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      <p className="mb-2 text-xs text-gray-500">{description}</p>
      <div className="relative rounded-lg overflow-hidden border border-[#2a1f14] bg-black aspect-video max-w-[320px]">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`w-full h-full object-cover ${mirror ? "scale-x-[-1]" : ""}`}
        />
        <canvas ref={canvasRef} className="hidden" />
        {status === "live" && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button
              type="button"
              onClick={capture}
              className="rounded-full w-16 h-16 border-4 border-white bg-white/20 hover:bg-white/40 transition flex items-center justify-center"
              aria-label="Capture photo"
            >
              <span className="rounded-full w-12 h-12 bg-white block" />
            </button>
          </div>
        )}
        {status === "starting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="text-sm text-gray-400">Starting camera...</span>
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-2">
            <span className="text-sm text-red-400">Camera unavailable</span>
            <button
              type="button"
              onClick={() => setRetry((r) => r + 1)}
              className="text-sm text-[#c8aa78] hover:underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Verification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [selfieFile, setSelfieFile] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [aadhaarFrontFile, setAadhaarFrontFile] = useState(null);
  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState(null);
  const [aadhaarBackFile, setAadhaarBackFile] = useState(null);
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Only one camera runs at a time: first section without a capture gets the camera
  const selfieReady = !selfiePreview;
  const aadhaarFrontReady = selfiePreview && !aadhaarFrontPreview;
  const aadhaarBackReady = selfiePreview && aadhaarFrontPreview && !aadhaarBackPreview;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    const emailTrim = email.trim();
    if (!emailTrim) {
      toast.error("Please enter your email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!selfieFile) {
      toast.error("Please capture your real-time selfie");
      return;
    }
    if (!aadhaarFrontFile) {
      toast.error("Please capture Aadhaar front side");
      return;
    }
    if (!aadhaarBackFile) {
      toast.error("Please capture Aadhaar back side");
      return;
    }
    if (!user?.id) {
      toast.error("Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", name.trim());
    formData.append("email", emailTrim);
    formData.append("current_pic", selfieFile, selfieFile.name || "current_pic.jpg");
    formData.append("adhar[]", aadhaarFrontFile, aadhaarFrontFile.name || "adhar_front.jpg");
    formData.append("adhar[]", aadhaarBackFile, aadhaarBackFile.name || "adhar_back.jpg");

    try {
      setLoading(true);
      const res = await api.post("/Wb/update_profile", formData);
      if (res.data?.status === 0) {
        const msg = res.data?.message || "Verification details submitted successfully.";
        toast.success(msg);
        const data = res.data?.data;
        let userToStore = user;
        if (data) {
          const token = data.token ?? user?.token ?? null;
          const { password: _, ...userSafe } = data;
          userToStore = Object.keys(userSafe).length ? userSafe : user;
          // After resubmit following rejection, show Verification Pending (pending review) instead of Rejected
          if (user?.is_approved == "2") {
            userToStore = { ...userToStore, is_approved: "0", is_verified: "1" };
          }
          dispatch(loginSuccess({ user: userToStore, token }));
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: userToStore, token }));
        }
        router.push("/dashboard");
      } else if (res.data?.status === 1) {
        toast.error(res.data?.message || "Verification submission failed.");
      } else {
        toast.success("Verification details submitted successfully.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
        <div className="rounded-xl border border-[#2a1f14] bg-[#111] p-8">
          <h1 className="mb-2 font-serif text-3xl text-[#c8aa78]">
            Identity Verification
          </h1>
          <p className="mb-8 text-sm text-gray-400">
            Name and real-time camera capture only. No uploads. Selfie uses front
            camera; Aadhaar uses back camera on mobile.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name as on Aadhaar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Email – read-only from account */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-[#0f0f0f] opacity-90`}
                required
              />
            </div>

            {/* Selfie – front camera (user) */}
            <CameraCapture
              shouldStartCamera={selfieReady}
              facingMode="user"
              capturedImage={selfiePreview}
              onCapture={(file, dataUrl) => {
                setSelfieFile(file);
                setSelfiePreview(dataUrl);
              }}
              onRetake={() => {
                setSelfieFile(null);
                setSelfiePreview(null);
              }}
              label="Real-time Selfie"
              description="Look at the camera and tap the button to capture. Uses front camera on mobile, webcam on desktop."
              mirror
            />

            {/* Aadhaar front – back camera (environment) */}
            <CameraCapture
              shouldStartCamera={aadhaarFrontReady}
              facingMode="environment"
              capturedImage={aadhaarFrontPreview}
              onCapture={(file, dataUrl) => {
                setAadhaarFrontFile(file);
                setAadhaarFrontPreview(dataUrl);
              }}
              onRetake={() => {
                setAadhaarFrontFile(null);
                setAadhaarFrontPreview(null);
              }}
              label="Aadhaar – Front Side"
              description="Point camera at the front of your Aadhaar card and capture. Uses back camera on mobile."
              mirror
            />

            {/* Aadhaar back – back camera (environment) */}
            <CameraCapture
              shouldStartCamera={aadhaarBackReady}
              facingMode="environment"
              capturedImage={aadhaarBackPreview}
              onCapture={(file, dataUrl) => {
                setAadhaarBackFile(file);
                setAadhaarBackPreview(dataUrl);
              }}
              onRetake={() => {
                setAadhaarBackFile(null);
                setAadhaarBackPreview(null);
              }}
              label="Aadhaar – Back Side"
              description="Point camera at the back of your Aadhaar card and capture."
              mirror
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" loading={loading} className="flex-1">
                Submit for Verification
              </Button>
              <Link
                href="/dashboard"
                className="rounded-md border border-[#2a1f14] px-6 py-3 text-center text-sm text-gray-400 hover:border-[#c8aa78] hover:text-[#c8aa78] transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
    </div>
  );
}
