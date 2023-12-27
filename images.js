const { createCanvas, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

// Define parameters
const canvasWidth = 200; // Adjust the canvas width
const canvasHeight = 100; // Adjust the canvas height
const fontSize = 40; // Adjust the font size
const borderWidth = 5; // Adjust the border width

// List of words
const words = [
  "سماء",
  "جمال",
  "حب",
  "يوم",
  "زهرة",
  "قهوة",
  "بحر",
  "نجمة",
  "قمر",
  "صداقة",
  "سعادة",
  "موسيقى",
  "رياح",
  "شمس",
  "جبل",
  "غابة",
  "حلم",
  "سكر",
  "فرح",
  "رقص",
  "سفر",
  "حياة",
  "ضحك",
  "سلام",
  "مطر",
  "قلب",
  "عائلة",
  "فناء",
  "حظ",
  "فرصة",
  "حكاية",
  "أمل",
  "تفاؤل",
  "همس",
  "غرام",
  "إبداع",
  "شجاعة",
  "سرور",
  "مغامرة",
  "سراب",
  "عطر",
  "محبة",
  "صمت",
  "جنة",
  "غيمة",
  "ليل",
  "فجر",
  "رحيل",
  "ألوان",
  "رائع",
  "زومبي",
  "قسطنطينة",
  "حبيبي والله",
  "صراع",
  "مشروع",
  "مثلث",
  "رفرف",
  "الشعر",
  "خنق",
  "لقب",
  "إخفاء",
  "بائع",
  "ثؤلول",
  "فينوس",
  "سلالة",
  "برميل",
  "حب",
  "معدن",
  "تمام",
  "كبسولة",
  "الخيل",
  "زهور",
  "حضن",
  "سيف",
  "مساء",
  "فستان",
  "رمال",
  "صحراء",
  "نوم",
  "غفوة",
  "صمت",
  "شوكولاتة",
  "عصفور",
  "مسافة",
  "سمك",
  "عصير",
  "خيال",
  "مرآة",
  "ريح",
  "فضاء",
  "علم",
  "كتاب",
  "طريق",
  "فراشة",
  "سيارة",
  "قلادة",
  "نظارات",
  "هدوء",
  "حيوان",
  "ربيع",
  "شتاء",
  "تلج",
  "أسد",
  "سلحفاة",
  "سفينة",
  "غرفة",
  "عقل",
  "فهم",
  "غزال",
  "أصفر",
  "جدار",
  "أرض",
  "نار",
  "هواء",
  "ماء",
  "تسلق",
  "هروب",
  "نجاح",
  "حزن",
  "عمق",
  "نبض",
  "حمام",
  "عيون",
  "مسجد",
  "بوابة",
  "مدرسة",
  "كرمة",
  "معجزة",
  "أمسية",
  "شرف",
  "جدول",
  "أمان",
  "سر",
  "حزم",
  "كرامة",
  "زجاج",
  "شرق",
  "جنوب",
  "غرب",
  "شمال",
  "نار",
  "شجرة",
  "عطش",
  "غضب",
  "عقلانية",
  "حياء",
  "رغبة",
  "فهم",
  "مبتسم",
  "مساء",
  "مطلق",
  "حملة",
  "تكنولوجيا",
  "صحة",
  "مرح",
  "عبقرية",
  "حصان",
  "تحدي",
  "قدرة",
  "تألق",
  "سكين",
  "جدارية",
  "تفاحة",
  "سجادة",
  "خطوة",
  "حكمة",
  "طموح",
  "سريع",
  "غموض",
  "حكاية",
  "كوكب",
  "أثر",
  "ترحال",
  "نسيم",
  "قلم",
  "صدى",
  "شبكة",
  "تنوع",
  "جمهور",
  "إيقاع",
  "حلق",
  "كريم",
  "غضب",
  "أسطورة",
  "صقر",
  "حقل",
  "طائر",
  "معجم",
  "تأمل",
  "سفر",
  "سباق",
  "شموس",
  "ضوء",
  "مجموعة",
  "بذور",
  "خيار",
  "سيفون",
  "تأمين",
  "عاطفة",
  "أوتار",
];

// Get the path to the font file
const fontPath = path.join(__dirname, "Cairo-VariableFont_slnt,wght.ttf");

// Register the font
registerFont(fontPath, { family: "CairoVariableFont" });

// Create a series of images
words.forEach((word, index) => {
  // Create a canvas
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  // Set font properties
  ctx.font = `${fontSize}px CairoVariableFont`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Calculate text position to center it
  const x = canvasWidth / 2;
  const y = canvasHeight / 2;

  // Draw the text on the canvas
  ctx.fillText(word, x, y);

  // Add white border
  ctx.strokeStyle = "white";
  ctx.lineWidth = borderWidth;
  ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

  // Save the canvas to an image file
  const out = fs.createWriteStream(`image_${word}.png`);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
});

console.log("Series of images created successfully!");
