import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import certificateTemplate from '../../../../assets/certificate/images/certificate_template.png'; // Verify path
import qrCode from '../../../../assets/certificate/images/QR Code.png'; // Verify path
import {
    Award, // Icon for Title
    User,
    Mail,
    Book,
    Download,
    Loader2,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
} from 'lucide-react';

// Animation variant
const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
    })
};

const GenCertificate: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // Keep email if needed for identification, though not printed
    const [courseTitle, setCourseTitle] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Preload images function
    const preloadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(`Failed to load image: ${src} - ${e}`);
            img.src = src;
        });
    };

    const generateCertificate = async () => {
        setError('');
        setSuccess('');

        if (!name.trim() || !email.trim() || !courseTitle.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        setIsGenerating(true);

        try {
            // Preload both images concurrently
            const [templateImg, qrImg] = await Promise.all([
                preloadImage(certificateTemplate),
                preloadImage(qrCode)
            ]);

            // --- PDF Generation Logic ---
            const docPDF = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [1086, 768], // Assuming template image dimensions
            });

            // Add template background
            docPDF.addImage(templateImg, 'PNG', 0, 0, 1086, 768);

            // Set styles and add dynamic text
            docPDF.setFontSize(28);
            docPDF.setFont('helvetica', 'bold');
            docPDF.setTextColor(0, 0, 0); // Black text
            docPDF.text(name.trim(), 543, 425, { align: 'center' }); // Centered Name

            docPDF.setFontSize(24);
            docPDF.setFont('helvetica', 'bold'); // Keep bold for course title maybe
            docPDF.text(courseTitle.trim(), 543, 510, { align: 'center' }); // Centered Course Title

            // Add QR Code
            docPDF.addImage(qrImg, 'PNG', 50, 470, 120, 120); // Position QR Code

            // Add Date
            docPDF.setFontSize(16); // Slightly smaller date
            docPDF.setFont('helvetica', 'normal');
            docPDF.setTextColor(80, 80, 80); // Gray text for date
            docPDF.text(`Date Issued: ${new Date().toLocaleDateString()}`, 110, 605, { align: 'center' }); // Position Date near QR

            // --- Save the PDF ---
            docPDF.save(`${name.trim()}-${courseTitle.trim()}-Certificate.pdf`);
            setSuccess('Certificate downloaded successfully!');

             // Optionally clear fields after success
             // setName(''); setEmail(''); setCourseTitle('');
             // setTimeout(() => setSuccess(''), 3000); // Clear message after a delay

        } catch (err: any) {
            console.error("Certificate generation error:", err);
            setError(typeof err === 'string' ? err : 'Failed to generate certificate. Check console.');
        } finally {
            setIsGenerating(false);
        }
    };

     // Helper to render styled inputs
     const renderInput = (
         name: string,
         value: string,
         onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
         placeholder: string,
         Icon: React.ElementType,
         type: string = "text",
         required: boolean = true,
         customIndex?: number
     ) => {
         const hasError = error && required && !value.trim();
         return (
             <motion.div className="relative" custom={customIndex} variants={fadeIn}>
                  <label htmlFor={name} className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">{placeholder}{required && ' *'}</label>
                 <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-0" />
                 <input
                     id={name} name={name} type={type} required={required}
                     value={value} onChange={onChange} placeholder={`Enter ${placeholder.toLowerCase()}...`}
                     className={`w-full p-4 pl-12 rounded-lg border ${hasError ? 'border-red-500' : 'border-gray-300'} bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none text-sm placeholder-gray-400`}
                 />
             </motion.div>
         );
     };

    return (
        <motion.div
            className="min-h-screen w-full font-[Montserrat] bg-slate-100 flex items-center justify-center p-6 py-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto" // Adjusted max-width
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
                <div className="p-8 sm:p-10">
                     {/* Header */}
                     <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                         <button
                            type="button"
                            onClick={() => navigate(-1)} // Go back
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>
                        <h1 className="text-2xl font-extrabold text-center text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 flex-grow text-center flex items-center justify-center gap-2"> {/* Changed gradient */}
                           <Award size={24} /> Generate Certificate
                        </h1>
                        <div className="w-16"></div> {/* Placeholder */}
                     </div>

                    <motion.div
                        className="space-y-5" // Adjusted spacing
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    >
                        {renderInput('name', name, (e) => setName(e.target.value), 'Full Name', User, 'text', true, 1)}
                        {renderInput('email', email, (e) => setEmail(e.target.value), 'Email Address', Mail, 'email', true, 2)}
                        {renderInput('courseTitle', courseTitle, (e) => setCourseTitle(e.target.value), 'Course Title', Book, 'text', true, 3)}

                         {/* Messages */}
                         <div className="h-6 mt-6 text-center">
                             <AnimatePresence>
                                 {error && (
                                     <motion.p className="text-red-600 text-sm flex items-center justify-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                         <AlertCircle size={16} /> {error}
                                     </motion.p>
                                 )}
                                 {success && (
                                     <motion.p className="text-green-600 text-sm flex items-center justify-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                         <CheckCircle size={16} /> {success}
                                     </motion.p>
                                 )}
                             </AnimatePresence>
                         </div>

                        {/* Generate Button */}
                        <motion.button
                            type="button" // Change to button since it's not submitting a standard form
                            onClick={generateCertificate}
                            disabled={!name || !email || !courseTitle || isGenerating}
                            className={`w-full mt-4 p-4 rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                                (name && email && courseTitle && !isGenerating)
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-indigo-500/40'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            whileHover={{ scale: (!name || !email || !courseTitle || isGenerating) ? 1 : 1.03 }}
                            whileTap={{ scale: (!name || !email || !courseTitle || isGenerating) ? 1 : 0.98 }}
                            variants={fadeIn} custom={4} // Animate button last
                        >
                            {isGenerating ? (
                                <> <Loader2 className="w-5 h-5 animate-spin" /> Generating... </>
                            ) : (
                                <> <Download size={18} /> Generate & Download </>
                            )}
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default GenCertificate;