const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Contact = require("../models/Contact");
const router = express.Router();
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

router.put("/profile", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const { name, phoneno, address, dob } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (phoneno) user.phoneno = phoneno;
    if (address) user.address = address;
    if (dob) user.dob = dob;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      name: user.name,
      email: user.email,
      phoneno: user.phoneno,
      address: user.address,
      dob: user.dob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating profile", error });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Us!",
      text: `Dear ${name},\n\nThank you for contacting us. Your message was: "${message}".\nWe will get back to you shortly.\n\nBest Regards,\nTeam EnergyFlow`,
    };

    // Email to yourself (admin)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to yourself
      subject: `New Contact Form Submission From ${name}`,
      text: `You have received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send both emails
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, phoneno, address, dob, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: "Email already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phoneno,
      address,
      dob,
      password: hashedPassword,
    });

    await newUser.save();

    // OPTIONAL: send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to EnergyFlow – Optimizing Your Industrial Future",
      text: `Hi ${name},\n\nWelcome to EnergyFlow – your partner in smart industrial tracking and energy optimization.\n\nWe're thrilled to have you on board! With EnergyFlow, you'll gain powerful insights into your operations, monitor key metrics in real time, and make data-driven decisions to drive efficiency and performance.\n\nHere’s what you can expect:\n- Seamless tracking of energy consumption and resource usage\n- Real-time analytics tailored to your industrial workflows\n- Actionable recommendations to optimize performance\n\nWhether you're streamlining processes or scaling operations, EnergyFlow equips you with the tools to unlock your facility’s full potential.\n\nExplore your dashboard now and let innovation take the lead.\n\nWelcome aboard,\n– The EnergyFlow Team`,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error signing up user", error });
  }
});

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ exists: true });
  }

  res.json({ exists: false });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password matches (you should hash and compare passwords in production)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload data to include in the token
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration (1 hour in this case)
    );

    // If valid credentials, send success response with the token
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        phoneno: user.phoneno,
        address: user.address,
        dob: user.dob,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
});
router.put("/profile", async (req, res) => {
  try {
    const email = req.user.email;
    const { name, phoneno, address, dob } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile fields
    if (name) user.name = name;
    if (phoneno) user.phoneno = phoneno;
    if (address) user.address = address;
    if (dob) user.dob = dob;

    await user.save(); // Save the updated user data

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating profile", error });
  }
});
router.get("/profile", async (req, res) => {
  try {
    const email = req.body?.email || req.query?.email || req.user?.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile data (excluding sensitive fields like password)
    const profileData = {
      name: user.name,
      email: user.email,
      phoneno: user.phoneno,
      address: user.address,
      dob: user.dob,
    };

    return res.status(200).json(profileData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching profile data", error });
  }
});

const multer = require("multer");
const upload = multer();

router.post("/send-monthly-report", upload.single("pdf"), async (req, res) => {
  try {
    const { email } = req.body;
    const pdfBuffer = req.file.buffer;

    if (!email || !pdfBuffer) {
      return res.status(400).json({ message: "Email or PDF missing" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Monthly Resource Report – ${new Date().toLocaleString(
        "default",
        {
          month: "long",
          year: "numeric",
        }
      )}`,
      text: `Hi,\n\nPlease find attached your resource report for this month.\n\nRegards,\nEnergyFlow Team`,
      attachments: [
        {
          filename: `Monthly_Report.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Report sent successfully." });
  } catch (err) {
    console.error("Email sending failed:", err);
    return res
      .status(500)
      .json({ message: "Failed to send report", error: err.message });
  }
});

module.exports = router;
