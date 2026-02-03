"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";

export default function PostAd() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  const [editAd, setEditAd] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(!!editId);

  const servicesList = [
    "service a",
    "service B",
    "service C",
    "service D",
    "service E",
    "service F",
    "service G",
    "service H",
    "service I",
  ];

  const timeSlots = [
    "6 AM – 12 PM",
    "12 PM – 6 PM",
    "6 PM – 12 AM",
    "12 AM – 6 AM",
  ];

  const [services, setServices] = useState([]);
  const [timing, setTiming] = useState([]);
  const [images, setImages] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [formName, setFormName] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formGender, setFormGender] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, rehydrated } = useSelector((state) => state.auth);
  const router = useRouter();

  const timeSlotToFromTo = {
    "6 AM – 12 PM": { from: "06:00", to: "12:00" },
    "12 PM – 6 PM": { from: "12:00", to: "18:00" },
    "6 PM – 12 AM": { from: "18:00", to: "24:00" },
    "12 AM – 6 AM": { from: "00:00", to: "06:00" },
  };

  const fromToToSlot = {};
  Object.entries(timeSlotToFromTo).forEach(([slot, { from, to }]) => {
    fromToToSlot[`${from}-${to}`] = slot;
  });

  useEffect(() => {
    if (!rehydrated) return;
    if (!user) {
      router.push("/login");
      return;
    }
    const isVerified = user?.is_verified == "1";
    const isApproved = user?.is_approved == "1";
    if (!isVerified) {
      toast.info("Please verify your profile first to post an ad.");
      router.push("/dashboard");
      return;
    }
    if (!isApproved) {
      toast.info("Your profile is under review. You can post ads once approved.");
      router.push("/dashboard");
      return;
    }
  }, [rehydrated, user, router]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const res = await api.post("/Wb/states");
        if (res.data?.status === "0" || res.data?.status === 0) {
          const data = res.data?.data;
          setStates(Array.isArray(data) ? data : []);
        } else {
          setStates([]);
        }
      } catch (err) {
        toast.error("Failed to load states.");
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (!editId || !user?.id) {
      setLoadingEdit(false);
      return;
    }
    const fetchAd = async () => {
      try {
        setLoadingEdit(true);
        const res = await api.get("/Wb/get_ads_by_id");
        const raw = res.data?.data;
        const list = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
        const ad = list.find((a) => String(a.id || a.ad_id) === String(editId));
        if (ad) {
          setEditAd(ad);
          setFormName(ad.name ?? ad.title ?? "");
          setFormMobile(ad.mobile ?? ad.phone ?? "");
          setFormDescription(ad.description ?? ad.details ?? "");
          setFormGender(ad.gender ?? "");
          const serviceList = ad.service ?? ad.services;
          setServices(Array.isArray(serviceList) ? serviceList : []);
          const fromTimes = ad.from_time ?? [];
          const toTimes = ad.to_time ?? [];
          const slots = [];
          for (let i = 0; i < Math.max(fromTimes.length, toTimes.length); i++) {
            const f = (fromTimes[i] || "").toString().trim();
            const t = (toTimes[i] || "").toString().trim();
            const key = `${f}-${t}`;
            if (fromToToSlot[key]) slots.push(fromToToSlot[key]);
          }
          setTiming([...new Set(slots)]);
          const imgs = ad.images;
          setExistingImageUrls(Array.isArray(imgs) ? imgs.filter((u) => typeof u === "string") : []);
          if (ad.state_id != null || ad.state != null) {
            setSelectedStateId(String(ad.state_id ?? ad.state ?? ""));
          }
          if (ad.city_id != null || ad.city != null) {
            setSelectedCityId(String(ad.city_id ?? ad.city ?? ""));
          }
        } else {
          toast.error("Ad not found.");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load ad.");
      } finally {
        setLoadingEdit(false);
      }
    };
    fetchAd();
  }, [editId, user?.id]);

  useEffect(() => {
    if (editAd && states.length > 0 && !selectedStateId && (editAd.state_name || editAd.state)) {
      const name = (editAd.state_name ?? editAd.state ?? "").toString().trim();
      const found = states.find((s) => (s.name || "").toString().trim() === name);
      if (found) setSelectedStateId(String(found.id));
    }
  }, [editAd, states, selectedStateId]);

  useEffect(() => {
    if (editAd && cities.length > 0 && !selectedCityId && (editAd.city_name || editAd.city)) {
      const name = (editAd.city_name ?? editAd.city ?? "").toString().trim();
      const found = cities.find((c) => (c.name || "").toString().trim() === name);
      if (found) setSelectedCityId(String(found.id));
    }
  }, [editAd, cities, selectedCityId]);

  useEffect(() => {
    if (!selectedStateId) {
      setCities([]);
      setSelectedCityId("");
      return;
    }
    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        setSelectedCityId("");
        const formData = new FormData();
        formData.append("state_id", selectedStateId);
        const res = await api.post("/Wb/cities", formData);
        if (res.data?.status === "0" || res.data?.status === 0) {
          const data = res.data?.data;
          setCities(Array.isArray(data) && data.length ? data : []);
        } else {
          setCities([]);
        }
      } catch (err) {
        toast.error("Failed to load cities.");
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [selectedStateId]);

  const toggleItem = (value, list, setList) => {
    setList(
      list.includes(value)
        ? list.filter((i) => i !== value)
        : [...list, value]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files].slice(0, 15));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value?.trim();
    const email = form.email?.value?.trim();
    const gender = form.gender?.value;
    const mobile = form.mobile?.value?.trim();
    const description = form.description?.value?.trim();

    if (!name || !email || !gender || !mobile) {
      toast.error("Please fill name, email, gender and mobile.");
      return;
    }
    if (!selectedStateId || !selectedCityId) {
      toast.error("Please select state and city.");
      return;
    }
    if (services.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }
    if (timing.length === 0) {
      toast.error("Please select at least one ad show time.");
      return;
    }
    const totalImages = existingImageUrls.length + images.length;
    if (totalImages < 2) {
      toast.error("Please have at least 2 images (existing + new uploads).");
      return;
    }

    const formData = new FormData();
    if (editAd) {
      formData.append("ads_id", editAd.id ?? editAd.ad_id ?? editId);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("mobile", mobile);
    formData.append("state", selectedStateId);
    formData.append("city", selectedCityId);
    formData.append("description", description || "");

    services.forEach((s) => formData.append("service[]", s));
    timing.forEach((slot) => {
      const { from, to } = timeSlotToFromTo[slot] || {};
      if (from) formData.append("from_time[]", from);
      if (to) formData.append("to_time[]", to);
    });
    images.forEach((img) => formData.append("img[]", img, img.name || "image.jpg"));

    try {
      setSubmitting(true);
      const url = editAd ? "/Wb/ads_update" : "/Wb/ads";
      const res = await api.post(url, formData);
      if (res.data?.status === "0" || res.data?.status === 0) {
        toast.success(res.data?.message || (editAd ? "Ad updated successfully." : "Ad posted successfully."));
        router.push("/dashboard/my-ads");
      } else {
        toast.error(res.data?.message || (editAd ? "Failed to update ad." : "Failed to post ad."));
      }
    } catch (err) {
      const msg = err.response?.data?.message || (editAd ? "Failed to update ad. Please try again." : "Failed to post ad. Please try again.");
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  if (editId && loadingEdit) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-serif text-[#c8aa78]">{editAd ? "Edit Your Ad" : "Post Your Ad"}</h1>
          <p className="text-gray-400">
            {editAd ? "Update your ad details below." : "Create your escort profile and start receiving genuine inquiries."}
          </p>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid>
            <input
              name="name"
              placeholder="Display Name"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
            />
            <select
              name="gender"
              required
              value={formGender}
              onChange={(e) => setFormGender(e.target.value)}
              className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
            >
              <option value="">Gender</option>
              {["Female", "Male", "Transgender"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <Input name="email" type="email" placeholder="Email Address" value={user?.email ?? ""} readOnly />
            <input
              name="mobile"
              placeholder="Phone / WhatsApp Number"
              required
              value={formMobile}
              onChange={(e) => setFormMobile(e.target.value)}
              className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
            />
          </Grid>
        </Section>

        {/* LOCATION – State & City from API */}
        <Section title="Location Details">
          <Grid>
            <div>
              <label className="mb-2 block text-sm text-gray-400">State</label>
              <select
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                disabled={loadingStates}
                className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78] disabled:opacity-50"
              >
                <option value="">{loadingStates ? "Loading..." : "Select State"}</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">City</label>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                disabled={!selectedStateId || loadingCities}
                className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78] disabled:opacity-50"
              >
                <option value="">{loadingCities ? "Loading..." : "Select City"}</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </Grid>
        </Section>

        {/* BODY DETAILS */}
        {/* <Section title="Physical Details">
          <Grid>
            <Select label="Body Type" options={["Slim", "Curvy", "Athletic"]} />
            <Select label="Hair Color" options={["Black", "Brown", "Blonde"]} />
            <Select label="Breast Size" options={["Small", "Medium", "Large"]} />
            <Select label="Breast Type" options={["Natural", "Enhanced"]} />
          </Grid>
        </Section> */}

        {/* SERVICES MULTI SELECT */}
        <Section title="Services Offered">
          <div className="flex flex-wrap gap-3">
            {servicesList.map((item) => (
              <Pill
                key={item}
                active={services.includes(item)}
                onClick={() => toggleItem(item, services, setServices)}
              >
                {item}
              </Pill>
            ))}
          </div>
        </Section>

        {/* AD TIMING */}
        <Section title="Ad Show Time">
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((slot) => (
              <Pill
                key={slot}
                active={timing.includes(slot)}
                onClick={() => toggleItem(slot, timing, setTiming)}
              >
                {slot}
              </Pill>
            ))}
          </div>
        </Section>

        {/* IMAGE UPLOAD */}
        <Section title="Upload Photos">
          <p className="mb-4 text-sm text-gray-400">
            {editAd ? "Existing images below. Add more or keep as is. At least 2 total." : "Upload at least 2 images (up to 15)"}
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-6 w-full rounded-md border border-dashed border-[#2a1f14] bg-[#1a1a1a] p-4"
          />

          {existingImageUrls.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs text-gray-500">Existing images</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImageUrls.map((url, index) => (
                  <div
                    key={`existing-${index}`}
                    className="relative h-40 overflow-hidden rounded-lg border border-[#2a1f14]"
                  >
                    <img
                      src={url}
                      alt="existing"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative h-40 overflow-hidden rounded-lg border border-[#2a1f14]"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label="Remove photo"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600/90 hover:bg-red-500 flex items-center justify-center text-white text-lg font-bold transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* DESCRIPTION */}
        <Section title="Profile Description">
          <textarea
            name="description"
            rows={5}
            placeholder="Describe yourself, your personality and services..."
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
          />
        </Section>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-[#c8aa78] px-12 py-4 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (editAd ? "Updating..." : "Posting...") : (editAd ? "UPDATE AD" : "SUBMIT AD")}
          </button>
        </div>
    </form>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-[#2a1f14] bg-[#111] p-8 space-y-6">
      <h2 className="text-xl font-semibold text-[#c8aa78]">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>;
}

function Input({ placeholder, name, type = "text", required, value, readOnly }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      readOnly={readOnly}
      className={`w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78] ${readOnly ? "opacity-90 cursor-not-allowed" : ""}`}
    />
  );
}

function Select({ label, options, name, required }) {
  return (
    <select
      name={name}
      required={required}
      className="w-full rounded-md bg-[#1a1a1a] border border-[#2a1f14] px-4 py-3 text-sm outline-none focus:border-[#c8aa78]"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm border transition
        ${
          active
            ? "bg-[#c8aa78] text-black border-[#c8aa78]"
            : "border-[#2a1f14] text-gray-300 hover:border-[#c8aa78]"
        }`}
    >
      {children}
    </button>
  );
}
