import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import theme from "../../components/themes/Theme";
import PartnerLogo from './PartnerLogo';

// 1. Validation Schema
const PartnerSchema = Yup.object().shape({
  orgName: Yup.string().required('Organization name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  partnerType: Yup.string().required('Please select a partnership type'),
  message: Yup.string().min(20, 'Message is too short').required('Tell us how we can collaborate'),
});

export default function PartnerForm() {
  const formik = useFormik({
    initialValues: {
      orgName: '',
      email: '',
      partnerType: '',
      message: '',
    },
    validationSchema: PartnerSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      // Here you would typically connect to your Node.js/Express backend
    //   try and change the api

  try {
    const response = await fetch('http://localhost:5000/api/partner-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      alert('Thank you for reaching out! Our team will contact you shortly.');
      resetForm();
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error("Connection error:", error);
    alert('Server is currently offline.');
  } finally {
    setSubmitting(false);
  }},
  });

  return (
    <section className=" bg-slate-950 text-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Partner With Us</h2>
          <p className="text-slate-400 mt-4">Join our mission to build resilient communities.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
          
          {/* Organization Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Individual | Organization Name</label>
            <input
            //   name="orgName"
            placeholder="John Amaka Adanne"
              type="text"
              {...formik.getFieldProps('orgName')}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 outline-none transition-all ${
                formik.touched.orgName && formik.errors.orgName ? 'border-red-500' : 'border-white/10 focus:border-yellow-400'
              }`}
            />
            {formik.touched.orgName && formik.errors.orgName && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.orgName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
            //   name="email"
            placeholder="jane@example.com"
              type="email"
              {...formik.getFieldProps('email')}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 outline-none transition-all ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-white/10 focus:border-yellow-400'
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Partnership Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Partnership Type</label>
            <select
            //   name="partnerType"
              {...formik.getFieldProps('partnerType')}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 text-white"
            >
              <option value="">Select an option</option>
              <option value="corporate">Corporate CSR</option>
              <option value="ngo">NGO Collaboration</option>
              <option value="grant">Grant Funding</option>
              <option value="volunteer">Institutional Volunteering</option>
            </select>
            {formik.touched.partnerType && formik.errors.partnerType && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.partnerType}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">How can we work together?</label>
            <textarea
            //   name="message"
            placeholder="Kindly type in your message here..."
              rows={4}
              {...formik.getFieldProps('message')}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 outline-none transition-all ${
                formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-white/10 focus:border-yellow-400'
              }`}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-4 rounded-xl font-bold text-slate-900 shadow-lg transition-all disabled:opacity-50"
            style={{ background: theme.gold }}
          >
            {formik.isSubmitting ? 'Sending...' : 'Send Partnership Proposal'}
          </motion.button>
        </form>
      </div>
      <PartnerLogo/>
    </section>
  );
}


// these two should be part of .env
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-16-digit-google-app-password

// other backend google mailing
// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config(); // To store your password safely

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Configure the email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email provider
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, // Use an "App Password," not your real password
//   },
// });

// app.post('/api/partner-request', async (req, res) => {
//   const { orgName, email, partnerType, message } = req.body;

//   const mailOptions = {
//     from: email,
//     to: process.env.EMAIL_USER,
//     subject: `New Partnership Request: ${orgName}`,
//     html: `
//       <h3>New Partnership Proposal</h3>
//       <p><strong>Organization:</strong> ${orgName}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Type:</strong> ${partnerType}</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error sending email' });
//   }
// });

// app.listen(5000, () => console.log('Server running on port 5000'));