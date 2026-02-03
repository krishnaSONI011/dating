'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';
import { allLocations, toSlug } from '../../data/locations';

function isApiSuccess(res) {
  const s = res?.data?.status;
  return s === '1' || s === 1 || s === '0' || s === 0;
}

export default function HeroVideo() {
  const router = useRouter();
  const [apiStates, setApiStates] = useState([]);
  const [apiCities, setApiCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const selectedState = apiStates.find((s) => String(s.id) === String(selectedStateId))
    || (selectedStateId ? { name: selectedStateId } : null);
  const selectedCity = apiCities.find((c) => String(c.id) === String(selectedCityId));

  const statesForDropdown = apiStates.length > 0
    ? apiStates.map((s) => ({ value: s.id, label: s.name }))
    : Object.keys(allLocations).map((name) => ({ value: name, label: name }));
  const citiesForDropdown = apiCities.length > 0
    ? apiCities.map((c) => ({ value: c.id, label: c.name || c.city_name || c.city || '' }))
    : (selectedStateId && typeof selectedStateId === 'string' && allLocations[selectedStateId]
      ? allLocations[selectedStateId].map((name) => ({ value: name, label: name }))
      : []);

  // Clear any stored search/location IDs when user is on homepage (use URL/API only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        ['search_location', 'state_id', 'city_id', 'search_state_id', 'search_city_id'].forEach((key) =>
          localStorage.removeItem(key)
        );
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.post('/Wb/states');
        if (isApiSuccess(res) && Array.isArray(res.data?.data)) {
          setApiStates(res.data.data);
        }
      } catch {
        setApiStates([]);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities by state_id from POST /Wb/cities when a state is selected
  useEffect(() => {
    if (!selectedStateId) {
      setApiCities([]);
      return;
    }
    let cancelled = false;
    setLoadingCities(true);
    const formData = new FormData();
    formData.append('state_id', selectedStateId);
    api.post('/Wb/cities', formData)
      .then((res) => {
        if (cancelled) return;
        const raw = res.data?.data;
        const list = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
        setApiCities(list);
      })
      .catch(() => {
        if (!cancelled) setApiCities([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingCities(false);
      });
    return () => { cancelled = true; };
  }, [selectedStateId]);

  const handleSearch = () => {
    let url = '/all/all';
    if (selectedState) {
      const stateSlug = toSlug(selectedState.name);
      if (selectedCity) {
        const cityName = selectedCity.name || selectedCity.city_name || selectedCity.city || '';
        const citySlug = toSlug(cityName);
        url = `/${stateSlug}/${citySlug}`;
      } else {
        url = `/${stateSlug}/all`;
      }
    }
    // Add search keyword as query parameter if provided
    if (searchKeyword.trim()) {
      url += `?q=${encodeURIComponent(searchKeyword.trim())}`;
    }
    router.push(url);
  };

  return (
    <section className="relative min-h-screen h-screen w-full overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/sexy-dancer.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-3 sm:px-4 pt-20 sm:pt-24 pb-8">
        <div className="max-w-4xl w-full text-center text-white">

          <p className="mb-2 sm:mb-4 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase">
            Welcome To
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-widest px-1">
            Escorts Service
          </h1>

          <p className="mt-2 sm:mt-4 text-base sm:text-lg tracking-wide uppercase">
            Companionship Services
          </p>

          {/* SEARCH BAR */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row flex-wrap items-stretch md:items-center justify-center gap-3 rounded-xl bg-black/70 p-3 sm:p-4 backdrop-blur-md border border-[#3a2c1a]">

            {/* Search Keyword Input */}
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Search by keyword..."
              className="w-full md:w-64 rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
            />

            {/* State */}
            <select
              value={selectedStateId}
              onChange={(e) => {
                setSelectedStateId(e.target.value);
                setSelectedCityId('');
              }}
              className="w-full md:w-48 rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
            >
              <option value="">Select State</option>
              {statesForDropdown.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            {/* City */}
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              disabled={!selectedStateId || loadingCities}
              className="w-full md:w-48 rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none border border-[#2a1f14] focus:border-[#c8aa78] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">{loadingCities ? 'Loading cities...' : 'Select City'}</option>
              {citiesForDropdown.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="w-full md:w-auto rounded-md bg-[#c8aa78] px-8 py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition"
            >
              SEARCH
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap justify-center gap-3 sm:gap-6">
            <button className="bg-[#9b8a6a] px-5 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white hover:bg-[#b3a27f] transition">
              OUR MODELS
            </button>

            <button className="border border-[#9b8a6a] px-5 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white hover:bg-[#9b8a6a] hover:text-black transition">
              SERVICES
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
