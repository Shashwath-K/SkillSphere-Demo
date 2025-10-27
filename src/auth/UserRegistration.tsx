import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo/logo.png";
import {
  User,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Book,
  School,
  Calendar,
  Home as HomeIcon,
  Users,
  Camera,
  Search,
} from "lucide-react";

// --- START: DEMO DATA ---
const DEMO_INSTITUTIONS = [
  { id: "inst-1", name: "Demo University of Technology" },
  { id: "inst-2", name: "Fake College of Arts & Science" },
  { id: "inst-3", name: "Sample Institute of Design" },
  { id: "inst-4", name: "Mock State University" },
];
// --- END: DEMO DATA ---

// Animation variant for form steps
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    position: "absolute" as "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as "relative",
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    position: "absolute" as "absolute",
  }),
};

const UserRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [institutions, setInstitutions] = useState<
    { id: string; name: string }[]
  >([]);
  const [collegeSearch, setCollegeSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const collegeDropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    usn: "",
    university: "",
    college: "",
    dob: "",
    address: "",
    photo: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // --- Fetch Institutions (MOCKED) ---
  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setInstitutions(DEMO_INSTITUTIONS);
    }, 500); // 0.5s delay
    return () => clearTimeout(timer);
  }, []);

  // --- Click outside for college dropdown (Unchanged) ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collegeDropdownRef.current &&
        !collegeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((f) => ({ ...f, photo: file }));
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  // --- Client-side validation logic (Unchanged) ---
  const nextStep = () => {
    setError("");
    // --- Validate Step 1 ---
    if (step === 1) {
      const { firstName, lastName, email, password, confirmPassword } = form;
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError("Please fill out all account fields.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    }

    // --- Validate Step 2 ---
    if (step === 2) {
      const { usn, university, college, gender, dob, address } = form;
      if (!usn || !university || !college || !gender || !dob || !address) {
        setError("Please fill out all personal & academic details.");
        return;
      }
    }

    setDirection(1);
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setError("");
    setDirection(-1);
    setStep((s) => s - 1);
  };

  // --- Mock Image Upload ---
  const uploadProfilePicture = async (file: File): Promise<string> => {
    console.log("DEMO: Simulating image upload for:", file.name);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Return a fake URL (e.g., from a placeholder service or the local preview)
    return previewUrl || "https://via.placeholder.com/150?text=DEMO";
  };

  // --- Firebase institution fetch REMOVED ---
  // const fetchInstitutionByCollege = ...

  // --- Mock Registration Handler ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.photo) {
      setError("Please select a profile picture.");
      return;
    }

    setMessage("");
    setError("");
    setLoading(true);

    // --- Demo logic check ---
    if (form.email === "error@example.com") {
      setTimeout(() => {
        setLoading(false);
        setError("Demo Error: This email address is already in use.");
        setStep(1); // Go back to step 1
        setDirection(-1);
      }, 1500);
      return;
    }

    // --- Simulate success ---
    try {
      // 1. Simulate image upload
      const photoURL = await uploadProfilePicture(form.photo);

      // 2. Log what would be sent
      const userData = {
        ...form,
        photo: undefined, // Don't log the file object
        photoURL: photoURL,
        userRole: "Student",
        // createdAt: new Date().toISOString(), // Simulated timestamp
      };
      console.log("DEMO: Registration complete. User data:", userData);

      // 3. Simulate remaining network time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error("Demo registration error:", err);
      setError(err.message || "Demo registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const filteredInstitutions = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  // Function to render inputs with icons (Unchanged)
  const renderInput = (
    name: string,
    type: string,
    placeholder: string,
    icon: React.ElementType
  ) => {
    const Icon = icon;
    return (
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={form[name as keyof typeof form] as string}
          onChange={handleChange}
          required
          className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full font-[Montserrat] bg-slate-100 flex items-center justify-center p-6 py-12">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto overflow-hidden"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="SkillSphere Logo"
              className="mx-auto h-16 w-auto mb-6"
            />
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-gray-500 mt-2">Step {step} of 3</p>
          </div>

          {/* Form container with fixed height to prevent layout jumps */}
          <div className="relative h-[480px]">
            <AnimatePresence initial={false} custom={direction}>
              {/* Step 1: Account Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-5 w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {renderInput("firstName", "text", "First Name", User)}
                    {renderInput("lastName", "text", "Last Name", User)}
                  </div>
                  {renderInput("email", "email", "Email", Mail)}
                  {renderInput(
                    "password",
                    "password",
                    "Password (min. 6 chars)",
                    Lock
                  )}
                  {renderInput(
                    "confirmPassword",
                    "password",
                    "Confirm Password",
                    Lock
                  )}

                  <div className="pt-4">
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      className="w-full p-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/40"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next: Details <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Academic & Personal */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-5 w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {renderInput("usn", "text", "USN / ID Number", Book)}
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {renderInput("university", "text", "University", School)}

                  {/* College Search Dropdown */}
                  <div className="relative" ref={collegeDropdownRef}>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search and Select College"
                      value={collegeSearch}
                      onChange={(e) => {
                        setCollegeSearch(e.target.value);
                        setForm((f) => ({ ...f, college: "" })); // Clear on search
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      required={!form.college}
                      className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                    <AnimatePresence>
                      {showDropdown && (
                        <motion.ul
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                        >
                          {filteredInstitutions.length > 0 ? (
                            filteredInstitutions.map((inst) => (
                              <li
                                key={inst.id}
                                onClick={() => {
                                  setCollegeSearch(inst.name);
                                  setForm((f) => ({ ...f, college: inst.name }));
                                  setShowDropdown(false);
                                }}
                                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              >
                                {inst.name}
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-3 text-sm text-gray-500">
                              No results found
                            </li>
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                    {renderInput("address", "text", "Address", HomeIcon)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      className="w-full p-4 flex items-center justify-center gap-2 rounded-lg bg-gray-200 text-gray-700 font-semibold transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      className="w-full p-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/40"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next: Photo <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Profile Picture */}
              {step === 3 && (
                <motion.form
                  key="step3"
                  onSubmit={handleRegister}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-6 w-full"
                >
                  <label
                    htmlFor="photo"
                    className="cursor-pointer w-full h-56 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-500 transition-colors"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <>
                        <Camera className="w-12 h-12 mb-2" />
                        <span className="font-semibold">
                          Upload Profile Picture
                        </span>
                        <span className="text-sm">
                          Click here to select an image
                        </span>
                      </>
                    )}
                  </label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      className="w-full p-4 flex items-center justify-center gap-2 rounded-lg bg-gray-200 text-gray-700 font-semibold transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full p-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold transition-all shadow-lg hover:shadow-cyan-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
                      whileHover={{ scale: loading ? 1 : 1.03 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        "Create Account"
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- Bottom Section: Messages & Toggle Link --- */}
        <div className="px-8 sm:px-10 pb-8 pt-4">
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-600 text-sm text-center mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {error}
              </motion.p>
            )}
            {message && (
              <motion.p
                className="text-green-600 text-sm text-center mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserRegistration;