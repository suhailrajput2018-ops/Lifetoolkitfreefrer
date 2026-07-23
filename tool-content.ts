import { ToolContent, FAQ } from '@/types';

export function getToolContent(toolId: string): ToolContent {
  const contents: Record<string, ToolContent> = {
    'age-calculator': {
      title: 'Age Calculator',
      description: 'Calculate your exact age in years, months, weeks, days, hours, minutes, and seconds from your birth date.',
      howToUse: [
        'Enter your birth date in the date picker',
        'Optionally select a specific date to calculate your age on that date',
        'Click "Calculate" to see your exact age',
        'View detailed breakdown in years, months, days, and more',
      ],
      faqs: [
        {
          question: 'How accurate is this age calculator?',
          answer: 'Our age calculator provides precise calculations down to the second, accounting for leap years and varying month lengths.',
        },
        {
          question: 'Can I calculate age for a future date?',
          answer: 'Yes! You can select any date in the past or future to calculate your age on that specific date.',
        },
        {
          question: 'Does this calculator account for leap years?',
          answer: 'Absolutely! Our calculator properly handles leap years and all calendar variations.',
        },
      ],
      examples: [
        'Born on January 15, 1990? You are 34 years, 6 months old today.',
        'Calculate how old you will be on your next birthday.',
        'Find out the exact time between two important dates.',
      ],
      commonMistakes: [
        'Entering the wrong date format - use the date picker for accuracy',
        'Confusing month and day in MM/DD vs DD/MM formats',
        'Not accounting for time zones when calculating for specific events',
      ],
      relatedTools: ['date-difference', 'birthday-reminder', 'zodiac-calculator'],
    },
    'date-difference': {
      title: 'Date Difference Calculator',
      description: 'Calculate the difference between two dates in days, weeks, months, and years.',
      howToUse: [
        'Select the start date',
        'Select the end date',
        'Click "Calculate" to see the difference',
        'View results in multiple units (days, weeks, months, years)',
      ],
      faqs: [
        {
          question: 'Can I calculate the difference between any two dates?',
          answer: 'Yes! You can calculate the difference between any two valid dates.',
        },
        {
          question: 'Does this include both start and end dates?',
          answer: 'The calculation shows the time between dates, not including the end date.',
        },
      ],
      examples: [
        'Calculate days until your vacation',
        'Find out how long a project took',
        'Determine the duration between two events',
      ],
      commonMistakes: [
        'Selecting dates in wrong order (end before start)',
        'Not considering time zones for important events',
      ],
      relatedTools: ['age-calculator', 'date-calculator', 'countdown'],
    },
    'percentage-calculator': {
      title: 'Percentage Calculator',
      description: 'Calculate percentages, percentage increase/decrease, and solve percentage problems easily.',
      howToUse: [
        'Choose the type of percentage calculation',
        'Enter the required values',
        'Click "Calculate" to get the result',
        'View step-by-step breakdown',
      ],
      faqs: [
        {
          question: 'What types of percentage calculations can I do?',
          answer: 'Calculate percentage of a number, percentage increase/decrease, and find what percentage one number is of another.',
        },
      ],
      examples: [
        'What is 20% of 150? Answer: 30',
        'Percentage increase from 50 to 75: 50%',
        '25 is what percent of 200? Answer: 12.5%',
      ],
      commonMistakes: [
        'Confusing percentage increase with percentage of',
        'Not converting percentages to decimals for calculations',
      ],
      relatedTools: ['tip-calculator', 'discount-calculator', 'interest-calculator'],
    },
    'bmi-calculator': {
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index (BMI) and understand your health status.',
      howToUse: [
        'Enter your weight (kg or lbs)',
        'Enter your height (cm or ft/in)',
        'Click "Calculate BMI"',
        'View your BMI category and healthy weight range',
      ],
      faqs: [
        {
          question: 'What is a healthy BMI range?',
          answer: 'A healthy BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese.',
        },
        {
          question: 'Is BMI accurate for everyone?',
          answer: 'BMI is a general indicator. Athletes with high muscle mass may have higher BMI but still be healthy.',
        },
      ],
      examples: [
        'Weight: 70kg, Height: 175cm → BMI: 22.9 (Normal)',
        'Weight: 150lbs, Height: 5\'6" → BMI: 24.2 (Normal)',
      ],
      commonMistakes: [
        'Using incorrect units (mixing metric and imperial)',
        'Relying solely on BMI without considering other health factors',
      ],
      relatedTools: ['calorie-calculator', 'body-fat-calculator', 'ideal-weight'],
    },
    'password-generator': {
      title: 'Password Generator',
      description: 'Generate strong, secure passwords with customizable options.',
      howToUse: [
        'Select password length (8-64 characters)',
        'Choose character types to include',
        'Click "Generate Password"',
        'Copy the generated password securely',
      ],
      faqs: [
        {
          question: 'How long should my password be?',
          answer: 'At least 12 characters for most accounts, 16+ for sensitive accounts like banking.',
        },
        {
          question: 'Are these passwords truly random?',
          answer: 'Yes! We use cryptographically secure random number generation.',
        },
      ],
      examples: [
        'Kx9#mP2$vL8@nQ4',
        'Tr7!hB5&wN3*zF9',
        'Qm4@jD8#pS6!xC2',
      ],
      commonMistakes: [
        'Using passwords that are too short',
        'Not including special characters',
        'Reusing passwords across multiple accounts',
      ],
      relatedTools: ['password-strength', 'password-manager', 'two-factor-auth'],
    },
    'password-strength': {
      title: 'Password Strength Checker',
      description: 'Check the strength of your password and get improvement suggestions.',
      howToUse: [
        'Enter or paste your password',
        'View real-time strength analysis',
        'Review improvement suggestions',
        'Modify password based on feedback',
      ],
      faqs: [
        {
          question: 'Is my password stored anywhere?',
          answer: 'No! All analysis happens locally in your browser. We never store or transmit your password.',
        },
        {
          question: 'What makes a password strong?',
          answer: 'Length (12+ chars), mix of uppercase, lowercase, numbers, and special characters.',
        },
      ],
      examples: [
        'weak123 → Weak (too short, predictable)',
        'MyD0g$Name! → Good (mixed chars, but common pattern)',
        'Xk9#mP2$vL8@ → Very Strong (random, long, mixed)',
      ],
      commonMistakes: [
        'Using personal information (names, birthdays)',
        'Common patterns (123456, qwerty)',
        'Dictionary words without modification',
      ],
      relatedTools: ['password-generator', 'password-manager', 'breach-checker'],
    },
    'qr-code-generator': {
      title: 'QR Code Generator',
      description: 'Generate QR codes for URLs, text, contact info, and more.',
      howToUse: [
        'Select the QR code type (URL, Text, Contact, etc.)',
        'Enter the content',
        'Customize colors and size (optional)',
        'Click "Generate QR Code"',
        'Download as PNG or SVG',
      ],
      faqs: [
        {
          question: 'What can I encode in a QR code?',
          answer: 'URLs, text, contact info (vCard), WiFi credentials, email, phone numbers, and more.',
        },
        {
          question: 'How do I scan a QR code?',
          answer: 'Use your smartphone camera or a QR code scanner app.',
        },
      ],
      examples: [
        'Website URL: https://example.com',
        'WiFi: Network name and password',
        'Contact: Name, phone, email, address',
      ],
      commonMistakes: [
        'Making QR codes too small to scan',
        'Using low contrast colors',
        'Encoding too much data (slower scan)',
      ],
      relatedTools: ['qr-code-scanner', 'barcode-generator', 'url-shortener'],
    },
    'uuid-generator': {
      title: 'UUID Generator',
      description: 'Generate universally unique identifiers (UUIDs) in various versions.',
      howToUse: [
        'Select UUID version (v4 recommended)',
        'Choose quantity (1-100)',
        'Click "Generate UUIDs"',
        'Copy individual or all UUIDs',
      ],
      faqs: [
        {
          question: 'What is a UUID?',
          answer: 'A Universally Unique Identifier is a 128-bit number used to uniquely identify information.',
        },
        {
          question: 'Which UUID version should I use?',
          answer: 'Version 4 (random) is most common for general purposes.',
        },
      ],
      examples: [
        '550e8400-e29b-41d4-a716-446655440000',
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      ],
      commonMistakes: [
        'Using UUIDs as security tokens (use crypto tokens instead)',
        'Assuming UUIDs are completely unguessable',
      ],
      relatedTools: ['random-number-generator', 'hash-generator', 'guid-generator'],
    },
    'random-number-generator': {
      title: 'Random Number Generator',
      description: 'Generate random numbers within a specified range.',
      howToUse: [
        'Set minimum value',
        'Set maximum value',
        'Choose quantity of numbers',
        'Click "Generate"',
      ],
      faqs: [
        {
          question: 'Are these numbers truly random?',
          answer: 'We use cryptographically secure random number generation for maximum randomness.',
        },
        {
          question: 'Can I generate duplicate numbers?',
          answer: 'You can choose whether to allow duplicates or ensure unique numbers.',
        },
      ],
      examples: [
        'Generate lottery numbers: 1-49',
        'Dice roll: 1-6',
        'Random selection: 1-100',
      ],
      commonMistakes: [
        'Setting min greater than max',
        'Using for cryptographic purposes (use dedicated crypto libraries)',
      ],
      relatedTools: ['uuid-generator', 'random-name-picker', 'dice-roller'],
    },
    'text-counter': {
      title: 'Text Counter',
      description: 'Count characters, words, sentences, and paragraphs in your text.',
      howToUse: [
        'Paste or type your text',
        'View real-time statistics',
        'Copy or download results',
      ],
      faqs: [
        {
          question: 'What does this tool count?',
          answer: 'Characters (with/without spaces), words, sentences, paragraphs, and reading time.',
        },
      ],
      examples: [
        'Essay word count verification',
        'Social media character limit check',
        'Reading time estimation',
      ],
      commonMistakes: [
        'Not accounting for different word counting methods',
        'Ignoring special characters in counts',
      ],
      relatedTools: ['word-counter', 'character-counter', 'reading-time-calculator'],
    },
    'case-converter': {
      title: 'Case Converter',
      description: 'Convert text between uppercase, lowercase, title case, and more.',
      howToUse: [
        'Enter or paste your text',
        'Select the desired case format',
        'Click "Convert"',
        'Copy the converted text',
      ],
      faqs: [
        {
          question: 'What case formats are available?',
          answer: 'UPPERCASE, lowercase, Title Case, Sentence case, alternating Case, and INVERSE cASE.',
        },
      ],
      examples: [
        'hello world → HELLO WORLD (uppercase)',
        'HELLO WORLD → hello world (lowercase)',
        'hello world → Hello World (title case)',
      ],
      commonMistakes: [
        'Using wrong case format for context',
        'Not preserving special characters',
      ],
      relatedTools: ['text-counter', 'remove-duplicates', 'text-formatter'],
    },
    'json-formatter': {
      title: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data.',
      howToUse: [
        'Paste your JSON',
        'Click "Format" or "Validate"',
        'Copy formatted output',
        'Download as file (optional)',
      ],
      faqs: [
        {
          question: 'Does this validate JSON?',
          answer: 'Yes! It checks for syntax errors and shows detailed error messages.',
        },
      ],
      examples: [
        'Beautify minified JSON',
        'Validate API responses',
        'Format configuration files',
      ],
      commonMistakes: [
        'Missing quotes around keys',
        'Trailing commas',
        'Unescaped special characters',
      ],
      relatedTools: ['xml-formatter', 'yaml-validator', 'csv-converter'],
    },
    'base64-converter': {
      title: 'Base64 Encode/Decode',
      description: 'Encode and decode text to/from Base64 format.',
      howToUse: [
        'Select Encode or Decode',
        'Enter your text',
        'Click "Convert"',
        'Copy the result',
      ],
      faqs: [
        {
          question: 'What is Base64?',
          answer: 'Base64 is an encoding scheme that converts binary data to ASCII text.',
        },
        {
          question: 'Is Base64 encryption?',
          answer: 'No! Base64 is encoding, not encryption. It\'s easily reversible.',
        },
      ],
      examples: [
        'Encode: "Hello" → "SGVsbG8="',
        'Decode: "SGVsbG8=" → "Hello"',
      ],
      commonMistakes: [
        'Using Base64 for security (it\'s not encryption)',
        'Not handling special characters properly',
      ],
      relatedTools: ['url-converter', 'hash-generator', 'encryption-tool'],
    },
    'url-converter': {
      title: 'URL Encoder/Decoder',
      description: 'Encode and decode URLs for safe transmission over the internet.',
      howToUse: [
        'Select Encode or Decode',
        'Enter your URL or text',
        'Click "Convert"',
        'Copy the result',
      ],
      faqs: [
        {
          question: 'Why encode URLs?',
          answer: 'To safely transmit special characters that have reserved meanings in URLs.',
        },
      ],
      examples: [
        'Encode: "hello world" → "hello%20world"',
        'Decode: "hello%20world" → "hello world"',
      ],
      commonMistakes: [
        'Double-encoding URLs',
        'Not encoding all special characters',
      ],
      relatedTools: ['base64-converter', 'url-validator', 'link-checker'],
    },
    'hash-generator': {
      title: 'Hash Generator',
      description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) for any text.',
      howToUse: [
        'Enter your text',
        'Select hash algorithm',
        'Click "Generate Hash"',
        'Copy the hash value',
      ],
      faqs: [
        {
          question: 'What is a hash?',
          answer: 'A hash is a fixed-size string generated from input data. Same input always produces same hash.',
        },
        {
          question: 'Which algorithm should I use?',
          answer: 'SHA-256 or SHA-512 for security. MD5 and SHA-1 are deprecated for security use.',
        },
      ],
      examples: [
        'MD5: "hello" → 5d41402abc4b2a76b9719d911017c592',
        'SHA-256: "hello" → 2cf24dba...',
      ],
      commonMistakes: [
        'Using MD5/SHA-1 for passwords (use bcrypt instead)',
        'Assuming hashes are reversible (they\'re not)',
      ],
      relatedTools: ['password-generator', 'encryption-tool', 'checksum-calculator'],
    },
    'color-converter': {
      title: 'Color Converter',
      description: 'Convert colors between HEX, RGB, HSL, and CMYK formats.',
      howToUse: [
        'Enter color in any format',
        'View conversions to all formats',
        'Preview the color',
        'Copy any format',
      ],
      faqs: [
        {
          question: 'What color formats are supported?',
          answer: 'HEX (#RRGGBB), RGB (r,g,b), HSL (h,s%,l%), and CMYK (c,m,y,k%).',
        },
      ],
      examples: [
        '#FF5733 → RGB(255,87,51) → HSL(11,100%,60%)',
        'RGB(0,128,255) → #0080FF',
      ],
      commonMistakes: [
        'Incorrect HEX format (should be 6 digits)',
        'RGB values outside 0-255 range',
      ],
      relatedTools: ['gradient-generator', 'color-picker', 'palette-generator'],
    },
    'time-zone-converter': {
      title: 'Time Zone Converter',
      description: 'Convert time between different time zones around the world.',
      howToUse: [
        'Enter the time and date',
        'Select source time zone',
        'Select target time zone(s)',
        'View converted times',
      ],
      faqs: [
        {
          question: 'Does this handle DST?',
          answer: 'Yes! Daylight Saving Time is automatically accounted for.',
        },
      ],
      examples: [
        '9 AM EST = 2 PM GMT',
        'Schedule meetings across time zones',
      ],
      commonMistakes: [
        'Confusing EST/EDT',
        'Not accounting for DST changes',
      ],
      relatedTools: ['world-clock', 'meeting-planner', 'date-calculator'],
    },
    'unit-converter': {
      title: 'Unit Converter',
      description: 'Convert between different units of measurement including length, weight, temperature, and more.',
      howToUse: [
        'Select unit category',
        'Enter value',
        'Select from and to units',
        'View converted result',
      ],
      faqs: [
        {
          question: 'What units are supported?',
          answer: 'Length, weight, temperature, volume, area, speed, and more.',
        },
      ],
      examples: [
        '10 km = 6.21 miles',
        '100°F = 37.8°C',
        '1 kg = 2.2 lbs',
      ],
      commonMistakes: [
        'Confusing similar units (fl oz vs oz)',
        'Not checking unit category',
      ],
      relatedTools: ['currency-converter', 'measurement-calculator'],
    },
    'currency-converter': {
      title: 'Currency Converter',
      description: 'Convert between world currencies with real-time exchange rates.',
      howToUse: [
        'Enter amount',
        'Select source currency',
        'Select target currency',
        'View converted amount',
      ],
      faqs: [
        {
          question: 'How often are rates updated?',
          answer: 'Exchange rates are updated daily from reliable financial sources.',
        },
      ],
      examples: [
        '100 USD = 85 EUR',
        '1000 JPY = 6.50 USD',
      ],
      commonMistakes: [
        'Not checking current rates before transactions',
        'Confusing buying and selling rates',
      ],
      relatedTools: ['unit-converter', 'crypto-converter', 'inflation-calculator'],
    },
    'emi-calculator': {
      title: 'EMI/Loan Calculator',
      description: 'Calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans.',
      howToUse: [
        'Enter loan amount',
        'Enter interest rate (annual)',
        'Enter loan tenure',
        'View EMI and total interest',
      ],
      faqs: [
        {
          question: 'What is EMI?',
          answer: 'EMI is the fixed monthly payment for a loan, including principal and interest.',
        },
      ],
      examples: [
        '$100,000 at 5% for 30 years = $536.82/month',
      ],
      commonMistakes: [
        'Entering monthly rate instead of annual',
        'Not including processing fees',
      ],
      relatedTools: ['mortgage-calculator', 'loan-comparison', 'amortization-schedule'],
    },
    'mortgage-calculator': {
      title: 'Mortgage Calculator',
      description: 'Calculate monthly mortgage payments with taxes, insurance, and PMI.',
      howToUse: [
        'Enter home price',
        'Enter down payment',
        'Enter interest rate and term',
        'Add taxes and insurance (optional)',
        'View monthly payment breakdown',
      ],
      faqs: [
        {
          question: 'What is PMI?',
          answer: 'Private Mortgage Insurance is required when down payment is less than 20%.',
        },
      ],
      examples: [
        '$300,000 home, 20% down, 4% interest = $1,145.80/month',
      ],
      commonMistakes: [
        'Forgetting to include property taxes',
        'Not accounting for PMI',
      ],
      relatedTools: ['emi-calculator', 'affordability-calculator', 'refinance-calculator'],
    },
    'tip-calculator': {
      title: 'Tip Calculator',
      description: 'Calculate tips and split bills among multiple people easily.',
      howToUse: [
        'Enter bill amount',
        'Select tip percentage',
        'Enter number of people',
        'View tip and per-person amount',
      ],
      faqs: [
        {
          question: 'What\'s a standard tip?',
          answer: '15-20% is standard for restaurants in the US. Adjust based on service quality.',
        },
      ],
      examples: [
        '$100 bill, 18% tip, 4 people = $29.50 each',
      ],
      commonMistakes: [
        'Calculating tip on pre-tax vs post-tax amount',
        'Not splitting evenly',
      ],
      relatedTools: ['bill-splitter', 'discount-calculator', 'sales-tax-calculator'],
    },
    'calorie-calculator': {
      title: 'Calorie Calculator',
      description: 'Calculate your daily calorie needs based on your age, weight, height, and activity level.',
      howToUse: [
        'Enter age, gender, weight, height',
        'Select activity level',
        'Choose goal (maintain, lose, gain)',
        'View daily calorie recommendation',
      ],
      faqs: [
        {
          question: 'What is TDEE?',
          answer: 'Total Daily Energy Expenditure - the calories you burn in a day.',
        },
      ],
      examples: [
        'Moderate activity, maintain weight: 2200 cal/day',
        'Lose 1 lb/week: 1700 cal/day',
      ],
      commonMistakes: [
        'Overestimating activity level',
        'Not adjusting as weight changes',
      ],
      relatedTools: ['bmi-calculator', 'macro-calculator', 'meal-planner'],
    },
    'fuel-cost-calculator': {
      title: 'Fuel Cost Calculator',
      description: 'Calculate the fuel cost for your trip based on distance, fuel efficiency, and gas price.',
      howToUse: [
        'Enter trip distance',
        'Enter vehicle fuel efficiency',
        'Enter fuel price',
        'View total fuel cost',
      ],
      faqs: [
        {
          question: 'What units are supported?',
          answer: 'MPG (US/UK) or L/100km for efficiency. Miles or km for distance.',
        },
      ],
      examples: [
        '300 miles, 25 MPG, $3.50/gal = $42.00',
      ],
      commonMistakes: [
        'Using wrong MPG (city vs highway)',
        'Not accounting for traffic conditions',
      ],
      relatedTools: ['trip-calculator', 'mileage-tracker', 'ev-charging-calculator'],
    },
    'tax-calculator': {
      title: 'Tax Calculator',
      description: 'Estimate your income tax liability based on filing status and income.',
      howToUse: [
        'Select filing status',
        'Enter taxable income',
        'Enter deductions',
        'View estimated tax',
      ],
      faqs: [
        {
          question: 'Is this accurate?',
          answer: 'This provides estimates. Consult a tax professional for accurate calculations.',
        },
      ],
      examples: [
        'Single, $50,000 income ≈ $6,000 federal tax',
      ],
      commonMistakes: [
        'Using gross instead of taxable income',
        'Not including all deductions',
      ],
      relatedTools: ['salary-calculator', 'deduction-calculator', 'refund-estimator'],
    },
    'word-counter': {
      title: 'Word Counter',
      description: 'Count words and analyze text statistics in real-time.',
      howToUse: [
        'Paste or type your text',
        'View word count and statistics',
        'Copy results',
      ],
      faqs: [
        {
          question: 'How are words counted?',
          answer: 'Words are counted by splitting on whitespace. Hyphenated words count as one.',
        },
      ],
      examples: [
        'Essay: 1500 words',
        'Article: 800 words',
      ],
      commonMistakes: [
        'Not accounting for contractions',
        'Counting numbers as words differently',
      ],
      relatedTools: ['character-counter', 'text-counter', 'reading-time-calculator'],
    },
    'character-counter': {
      title: 'Character Counter',
      description: 'Count characters with and without spaces for social media and more.',
      howToUse: [
        'Enter your text',
        'View character counts',
        'Check against limits',
      ],
      faqs: [
        {
          question: 'Why count without spaces?',
          answer: 'Some platforms count differently. We show both for accuracy.',
        },
      ],
      examples: [
        'Twitter: 280 character limit',
        'SMS: 160 character limit',
      ],
      commonMistakes: [
        'Not accounting for emojis (may count as 2)',
        'Forgetting URL expansion on Twitter',
      ],
      relatedTools: ['word-counter', 'text-counter', 'hashtag-counter'],
    },
    'reading-time-calculator': {
      title: 'Reading Time Calculator',
      description: 'Estimate how long it takes to read a piece of text.',
      howToUse: [
        'Enter or paste text',
        'View estimated reading time',
        'Adjust reading speed (optional)',
      ],
      faqs: [
        {
          question: 'What\'s average reading speed?',
          answer: 'Average adult reads 200-250 words per minute.',
        },
      ],
      examples: [
        '1000 words ≈ 4-5 minutes',
        '5000 words ≈ 20-25 minutes',
      ],
      commonMistakes: [
        'Not accounting for text complexity',
        'Using wrong WPM for audience',
      ],
      relatedTools: ['word-counter', 'text-counter', 'speaking-time-calculator'],
    },
    'remove-duplicates': {
      title: 'Remove Duplicate Lines',
      description: 'Remove duplicate lines from text while preserving order.',
      howToUse: [
        'Paste your text',
        'Click "Remove Duplicates"',
        'Copy cleaned text',
      ],
      faqs: [
        {
          question: 'Does this preserve order?',
          answer: 'Yes! First occurrence of each line is kept.',
        },
      ],
      examples: [
        'Email list cleanup',
        'Remove duplicate entries',
      ],
      commonMistakes: [
        'Not trimming whitespace',
        'Case sensitivity issues',
      ],
      relatedTools: ['text-sorter', 'text-cleaner', 'csv-cleaner'],
    },
    'random-name-picker': {
      title: 'Random Name Picker',
      description: 'Randomly select names from a list for contests, giveaways, or decisions.',
      howToUse: [
        'Enter names (one per line)',
        'Select number of winners',
        'Click "Pick Winner"',
        'View selected name(s)',
      ],
      faqs: [
        {
          question: 'Is this truly random?',
          answer: 'Yes! We use cryptographically secure random selection.',
        },
      ],
      examples: [
        'Contest winner selection',
        'Team assignment',
        'Decision making',
      ],
      commonMistakes: [
        'Not entering one name per line',
        'Including empty lines',
      ],
      relatedTools: ['random-number-generator', 'dice-roller', 'coin-flipper'],
    },
    'barcode-generator': {
      title: 'Barcode Generator',
      description: 'Generate barcodes in various formats including Code128, EAN, and UPC.',
      howToUse: [
        'Enter barcode data',
        'Select barcode format',
        'Click "Generate"',
        'Download as image',
      ],
      faqs: [
        {
          question: 'What formats are supported?',
          answer: 'Code128, EAN-13, UPC-A, Code39, and more.',
        },
      ],
      examples: [
        'Product barcodes',
        'Inventory labels',
        'Asset tracking',
      ],
      commonMistakes: [
        'Invalid data for format',
        'Not verifying checksum',
      ],
      relatedTools: ['qr-code-generator', 'label-maker', 'inventory-tool'],
    },
    'qr-code-scanner': {
      title: 'QR Code Scanner',
      description: 'Scan QR codes using your device camera or upload an image.',
      howToUse: [
        'Allow camera access',
        'Point camera at QR code',
        'Or upload an image',
        'View decoded content',
      ],
      faqs: [
        {
          question: 'Does this work offline?',
          answer: 'Yes! Scanning happens entirely in your browser.',
        },
      ],
      examples: [
        'Scan product QR codes',
        'Decode contact info',
        'Open URLs from QR',
      ],
      commonMistakes: [
        'Poor lighting',
        'Damaged QR codes',
      ],
      relatedTools: ['qr-code-generator', 'barcode-scanner', 'image-reader'],
    },
    'image-compressor': {
      title: 'Image Compressor',
      description: 'Compress images to reduce file size while maintaining quality.',
      howToUse: [
        'Upload image',
        'Adjust compression level',
        'Preview result',
        'Download compressed image',
      ],
      faqs: [
        {
          question: 'What formats are supported?',
          answer: 'JPEG, PNG, WEBP, and more.',
        },
      ],
      examples: [
        'Reduce photo size for web',
        'Compress images for email',
      ],
      commonMistakes: [
        'Over-compressing (quality loss)',
        'Wrong format for use case',
      ],
      relatedTools: ['image-resizer', 'image-format-converter', 'image-optimizer'],
    },
    'image-resizer': {
      title: 'Image Resize Tool',
      description: 'Resize images to specific dimensions while maintaining aspect ratio.',
      howToUse: [
        'Upload image',
        'Set new dimensions',
        'Choose resize method',
        'Download resized image',
      ],
      faqs: [
        {
          question: 'Does this maintain quality?',
          answer: 'Yes! We use high-quality resampling algorithms.',
        },
      ],
      examples: [
        'Resize for social media',
        'Create thumbnails',
        'Fit specific dimensions',
      ],
      commonMistakes: [
        'Not maintaining aspect ratio',
        'Upscaling too much',
      ],
      relatedTools: ['image-compressor', 'image-cropper', 'image-format-converter'],
    },
    'image-format-converter': {
      title: 'Image Format Converter',
      description: 'Convert images between PNG, JPG, WEBP, and other formats.',
      howToUse: [
        'Upload image',
        'Select target format',
        'Adjust quality (optional)',
        'Download converted image',
      ],
      faqs: [
        {
          question: 'What formats can I convert to?',
          answer: 'PNG, JPEG, WEBP, GIF, BMP, and more.',
        },
      ],
      examples: [
        'PNG to JPEG for web',
        'HEIC to JPEG for compatibility',
      ],
      commonMistakes: [
        'Converting to lossy format unnecessarily',
        'Not checking transparency support',
      ],
      relatedTools: ['image-compressor', 'image-resizer', 'batch-converter'],
    },
    'pdf-merge': {
      title: 'PDF Merge',
      description: 'Merge multiple PDF files into a single document.',
      howToUse: [
        'Upload PDF files',
        'Arrange order',
        'Click "Merge"',
        'Download combined PDF',
      ],
      faqs: [
        {
          question: 'How many files can I merge?',
          answer: 'Up to 20 files at a time.',
        },
      ],
      examples: [
        'Combine report chapters',
        'Merge scanned documents',
      ],
      commonMistakes: [
        'Wrong file order',
        'Large file sizes',
      ],
      relatedTools: ['pdf-split', 'pdf-compress', 'pdf-editor'],
    },
    'pdf-split': {
      title: 'PDF Split',
      description: 'Split PDF files into multiple documents by page range.',
      howToUse: [
        'Upload PDF',
        'Select split method',
        'Choose pages',
        'Download split files',
      ],
      faqs: [
        {
          question: 'Can I extract specific pages?',
          answer: 'Yes! Select any page range to extract.',
        },
      ],
      examples: [
        'Extract specific pages',
        'Split by chapter',
      ],
      commonMistakes: [
        'Selecting wrong page range',
        'Not checking output',
      ],
      relatedTools: ['pdf-merge', 'pdf-extract', 'pdf-reorder'],
    },
    'pdf-compress': {
      title: 'PDF Compress',
      description: 'Compress PDF files to reduce file size.',
      howToUse: [
        'Upload PDF',
        'Select compression level',
        'Click "Compress"',
        'Download optimized PDF',
      ],
      faqs: [
        {
          question: 'How much can I compress?',
          answer: 'Typically 50-80% reduction depending on content.',
        },
      ],
      examples: [
        'Reduce for email attachment',
        'Optimize for web upload',
      ],
      commonMistakes: [
        'Over-compressing (quality loss)',
        'Not checking readability',
      ],
      relatedTools: ['pdf-merge', 'pdf-split', 'image-compressor'],
    },
    'pdf-to-image': {
      title: 'PDF to Image',
      description: 'Convert PDF pages to image files (PNG, JPG).',
      howToUse: [
        'Upload PDF',
        'Select pages',
        'Choose image format',
        'Download images',
      ],
      faqs: [
        {
          question: 'What resolution?',
          answer: 'Default 150 DPI, adjustable up to 300 DPI.',
        },
      ],
      examples: [
        'Extract pages as images',
        'Create thumbnails',
      ],
      commonMistakes: [
        'Wrong resolution',
        'Converting all pages unnecessarily',
      ],
      relatedTools: ['image-to-pdf', 'pdf-split', 'screenshot-tool'],
    },
    'image-to-pdf': {
      title: 'Image to PDF',
      description: 'Convert images to PDF documents.',
      howToUse: [
        'Upload images',
        'Arrange order',
        'Set page options',
        'Download PDF',
      ],
      faqs: [
        {
          question: 'Can I combine multiple images?',
          answer: 'Yes! Combine multiple images into one PDF.',
        },
      ],
      examples: [
        'Scan to PDF',
        'Photo album PDF',
      ],
      commonMistakes: [
        'Wrong image order',
        'Inconsistent image sizes',
      ],
      relatedTools: ['pdf-to-image', 'pdf-merge', 'image-compressor'],
    },
  };

  return (
    contents[toolId] || {
      title: 'Tool',
      description: 'A useful online tool.',
      howToUse: [
        'Enter your data',
        'Click calculate',
        'View results',
      ],
      faqs: [
        {
          question: 'How does this work?',
          answer: 'This tool processes your data locally in your browser.',
        },
      ],
      examples: [],
      commonMistakes: [],
      relatedTools: [],
    }
  );
}
