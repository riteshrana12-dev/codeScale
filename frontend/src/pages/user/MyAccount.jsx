import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api.js";

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border font-mono text-sm shadow-xl ${
            type === "success"
              ? "bg-[#0d1f14] border-[#00ff9d]/25 text-[#00ff9d]"
              : "bg-[#1f0d0d] border-[#f87171]/25 text-[#f87171]"
          }`}
        >
          {type === "success" ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function Card({ title, accent = "#00ff9d", children }) {
  return (
    <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-6">
      <div
        className="h-px mb-5"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}22, transparent)`,
        }}
      />
      {title && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#444460] mb-5">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

// ── Editable field ────────────────────────────────────────────────────────────
function EditableField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#444460] flex items-center gap-2">
        <span className="text-[#333350]">{icon}</span>
        {label}
      </label>
      <div className="flex items-center bg-[#0a0a15] border border-white/8 rounded-xl px-4 py-2.5 transition-all duration-200 focus-within:border-[#a78bfa]/40 focus-within:shadow-[0_0_0_1px_rgba(167,139,250,0.08)]">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none font-mono text-sm text-white placeholder-[#333350]"
          autoComplete={type === "password" ? "new-password" : "off"}
        />
      </div>
    </div>
  );
}

// ── Profile field (bio/links) ─────────────────────────────────────────────────
function ProfileField({ label, name, value, onChange, placeholder, icon }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#444460] flex items-center gap-2">
        <span className="text-[#333350]">{icon}</span>
        {label}
      </label>
      <div className="flex items-center bg-[#0a0a15] border border-white/8 rounded-xl px-4 py-2.5 transition-all duration-200 focus-within:border-[#00ff9d]/40 focus-within:shadow-[0_0_0_1px_rgba(0,255,157,0.08)]">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none font-mono text-sm text-white placeholder-[#333350]"
        />
      </div>
    </div>
  );
}

// ── Save button ───────────────────────────────────────────────────────────────
function SaveButton({ saving, label = "SAVE CHANGES", color = "#00ff9d" }) {
  return (
    <motion.button
      type="submit"
      disabled={saving}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 font-mono text-xs  px-5 py-2.5 rounded-xl border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        borderColor: `${color}1a`,
        color,
      }}
    >
      {saving ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 border rounded-full border-t-current border-white/20"
          />
          SAVING...
        </>
      ) : (
        <>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {label}
        </>
      )}
    </motion.button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const icons = {
  user: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  email: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  lock: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  bio: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="17" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  ),
  github: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  website: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

// ── Main ──────────────────────────────────────────────────────────────────────
const MyAccount = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingAccount, setSavingAccount] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  // Account fields (name, email, password)
  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Profile fields (bio, links)
  const [profileData, setProfileData] = useState({
    bio: "",
    github: "",
    linkedin: "",
    website: "",
  });

  function showToast(message, type = "success") {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  }

  async function fetchProfile() {
    try {
      const res = await api.get("/user/profile");
      const p = res.data.profile;
      setProfile(p);
      setAccountData({
        firstName: p?.firstName || "",
        lastName: p?.lastName || "",
        email: p?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setProfileData({
        bio: p?.profile?.bio || "",
        github: p?.profile?.github || "",
        linkedin: p?.profile?.linkedin || "",
        website: p?.profile?.website || "",
      });
    } catch (err) {
      console.error(err);
      showToast("Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleAccountSave(e) {
    e.preventDefault();
    if (
      accountData.newPassword &&
      accountData.newPassword !== accountData.confirmPassword
    ) {
      showToast("New passwords do not match", "error");
      return;
    }
    if (accountData.newPassword && accountData.newPassword.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    setSavingAccount(true);
    try {
      const payload = {
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        email: accountData.email,
      };
      if (accountData.newPassword) {
        payload.currentPassword = accountData.currentPassword;
        payload.newPassword = accountData.newPassword;
      }
      await api.put("/user/account", payload);
      showToast("Account updated successfully");
      // Clear password fields
      setAccountData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      await fetchProfile();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to update account",
        "error",
      );
    } finally {
      setSavingAccount(false);
    }
  }

  async function handleProfileSave(e) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api.put("/user/profile", profileData);
      showToast("Profile updated successfully");
      await fetchProfile();
    } catch (err) {
      showToast("Failed to update profile", "error");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleSignOut() {
    try {
      await api.post("/auth/logout");
    } catch (_) {
    } finally {
      const expiry = "expires=" + new Date(0).toUTCString();
      document.cookie = "userToken=;path=/;" + expiry;
      document.cookie = "userToken=;path=/;domain=localhost;" + expiry;
      navigate("/");
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-[#060610] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#00ff9d]/20 border-t-[#00ff9d] rounded-full"
        />
      </div>
    );
  }

  const joinedDate = profile?.activity?.joinedDate
    ? new Date(profile.activity.joinedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const initials =
    `${profile?.firstName?.[0] || ""}${profile?.lastName?.[0] || ""}`.toUpperCase();

  return (
    <>
      <div className="min-h-[calc(100vh-3.5rem)] bg-[#060610] relative">
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,157,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="fixed top-14 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.05)_0%,transparent_65%)] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-5">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#444460]">
                Settings
              </p>
              <h1 className="font-mono text-2xl font-black text-white mt-0.5 tracking-tight">
                My Account
              </h1>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 font-mono text-xs text-[#555575] hover:text-[#f87171] transition-all duration-200 px-4 py-2.5 rounded-xl border border-white/5 hover:border-[#f87171]/20 hover:bg-[#f87171]/[0.04]"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </motion.div>

          {/* Avatar strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.03 }}
          >
            <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#a78bfa]/20 to-[#00ff9d]/10 border border-white/8 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-lg font-black text-white">
                  {initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-base font-black text-white truncate">
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p className="font-mono text-xs text-[#555575] mt-0.5 truncate">
                  {profile?.email}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]"
                  style={{ boxShadow: "0 0 5px #00ff9d" }}
                />
                <span className="font-mono text-[10px] text-[#444460]">
                  Joined {joinedDate}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Account settings (name, email, password) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.07 }}
          >
            <form onSubmit={handleAccountSave}>
              <Card title="Account Settings" accent="#a78bfa">
                <div className="space-y-4">
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <EditableField
                      label="First Name"
                      name="firstName"
                      value={accountData.firstName}
                      onChange={(e) =>
                        setAccountData((p) => ({
                          ...p,
                          firstName: e.target.value,
                        }))
                      }
                      placeholder="First name"
                      icon={icons.user}
                    />
                    <EditableField
                      label="Last Name"
                      name="lastName"
                      value={accountData.lastName}
                      onChange={(e) =>
                        setAccountData((p) => ({
                          ...p,
                          lastName: e.target.value,
                        }))
                      }
                      placeholder="Last name"
                      icon={icons.user}
                    />
                  </div>

                  {/* Email */}
                  <EditableField
                    label="Email"
                    name="email"
                    type="email"
                    value={accountData.email}
                    onChange={(e) =>
                      setAccountData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    icon={icons.email}
                  />

                  {/* Password section */}
                  <div className="pt-3 border-t border-white/5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#333350] mb-3">
                      Change Password — leave blank to keep current
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <EditableField
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={accountData.currentPassword}
                        onChange={(e) =>
                          setAccountData((p) => ({
                            ...p,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="Current password"
                        icon={icons.lock}
                      />
                      <EditableField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={accountData.newPassword}
                        onChange={(e) =>
                          setAccountData((p) => ({
                            ...p,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="New password (min 6)"
                        icon={icons.lock}
                      />
                    </div>
                    {accountData.newPassword && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4"
                      >
                        <EditableField
                          label="Confirm New Password"
                          name="confirmPassword"
                          type="password"
                          value={accountData.confirmPassword}
                          onChange={(e) =>
                            setAccountData((p) => ({
                              ...p,
                              confirmPassword: e.target.value,
                            }))
                          }
                          placeholder="Repeat new password"
                          icon={icons.lock}
                        />
                        {accountData.confirmPassword &&
                          accountData.newPassword !==
                            accountData.confirmPassword && (
                            <p className="font-mono text-[10px] text-[#f87171] mt-1.5">
                              Passwords do not match
                            </p>
                          )}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <SaveButton
                    saving={savingAccount}
                    label="SAVE ACCOUNT"
                    color="#a78bfa"
                  />
                </div>
              </Card>
            </form>
          </motion.div>

          {/* ── Profile (bio, links) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.11 }}
          >
            <form onSubmit={handleProfileSave}>
              <Card title="Public Profile" accent="#00ff9d">
                <div className="space-y-4">
                  {/* Bio textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#444460] flex items-center gap-2">
                      <span className="text-[#333350]">{icons.bio}</span>Bio
                    </label>
                    <div className="bg-[#0a0a15] border border-white/8 rounded-xl px-4 py-3 focus-within:border-[#00ff9d]/40 focus-within:shadow-[0_0_0_1px_rgba(0,255,157,0.08)] transition-all duration-200">
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData((p) => ({ ...p, bio: e.target.value }))
                        }
                        placeholder="Tell the community about yourself..."
                        rows={3}
                        maxLength={200}
                        className="w-full bg-transparent outline-none font-mono text-sm text-white placeholder-[#333350] resize-none"
                      />
                      <p className="font-mono text-[9px] text-[#333350] text-right">
                        {profileData.bio.length}/200
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ProfileField
                      label="GitHub"
                      name="github"
                      value={profileData.github}
                      onChange={(e) =>
                        setProfileData((p) => ({
                          ...p,
                          github: e.target.value,
                        }))
                      }
                      placeholder="https://github.com/username"
                      icon={icons.github}
                    />
                    <ProfileField
                      label="LinkedIn"
                      name="linkedin"
                      value={profileData.linkedin}
                      onChange={(e) =>
                        setProfileData((p) => ({
                          ...p,
                          linkedin: e.target.value,
                        }))
                      }
                      placeholder="https://linkedin.com/in/username"
                      icon={icons.linkedin}
                    />
                    <ProfileField
                      label="Website"
                      name="website"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData((p) => ({
                          ...p,
                          website: e.target.value,
                        }))
                      }
                      placeholder="https://yoursite.com"
                      icon={icons.website}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <SaveButton
                    saving={savingProfile}
                    label="SAVE PROFILE"
                    color="#00ff9d"
                  />
                </div>
              </Card>
            </form>
          </motion.div>
        </div>
      </div>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </>
  );
};

export default MyAccount;
