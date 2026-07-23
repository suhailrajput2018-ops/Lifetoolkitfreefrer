import { notFound } from 'next/navigation';
import { getToolBySlug, toolsRegistry } from '@/lib/tools-registry';
import { getToolContent } from '@/lib/tool-content';
import { AdPlaceholder } from '@/components/ad-unit';
import { ToolCardCompact } from '@/components/tool-card';
import type { Metadata } from 'next';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return toolsRegistry.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const content = getToolContent(tool.id);

  return {
    title: tool.name,
    description: content.description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: `${tool.name} - Life Toolkit AI`,
      description: content.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - Life Toolkit AI`,
      description: content.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const content = getToolContent(tool.id);
  const relatedTools = toolsRegistry
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: content.description,
    applicationCategory: tool.category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
          <span>/</span>
          <a href="/tools" className="hover:text-blue-600 dark:hover:text-blue-400">Tools</a>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">{tool.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Tool Header */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl">{tool.icon}</span>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {tool.name}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    {content.description}
                  </p>
                </div>
              </div>

              {/* Tool Component */}
              <div className="mt-6">
                {getToolComponent(tool.id)}
              </div>
            </div>

            <AdPlaceholder type="inline" />

            {/* How to Use */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                How to Use {tool.name}
              </h2>
              <ol className="space-y-3">
                {content.howToUse.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Examples */}
            {content.examples.length > 0 && (
              <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Examples
                </h2>
                <ul className="space-y-2">
                  {content.examples.map((example, index) => (
                    <li key={index} className="text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                      <span className="text-blue-500">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Common Mistakes */}
            {content.commonMistakes.length > 0 && (
              <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Common Mistakes to Avoid
                </h2>
                <ul className="space-y-2">
                  {content.commonMistakes.map((mistake, index) => (
                    <li key={index} className="text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                      <span className="text-red-500">⚠️</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {content.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                      <svg
                        className="w-5 h-5 text-slate-500 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <AdPlaceholder type="sidebar" />
            
            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 sticky top-20">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                  Related Tools
                </h3>
                <div className="space-y-2">
                  {relatedTools.map((relatedTool) => (
                    <ToolCardCompact key={relatedTool.id} tool={relatedTool} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

// Dynamic component loader for tools
function getToolComponent(toolId: string) {
  switch (toolId) {
    case 'age-calculator':
      return <AgeCalculatorTool />;
    case 'date-difference':
      return <DateDifferenceTool />;
    case 'percentage-calculator':
      return <PercentageCalculatorTool />;
    case 'bmi-calculator':
      return <BMICalculatorTool />;
    case 'password-generator':
      return <PasswordGeneratorTool />;
    case 'password-strength':
      return <PasswordStrengthTool />;
    case 'qr-code-generator':
      return <QRCodeGeneratorTool />;
    case 'uuid-generator':
      return <UUIDGeneratorTool />;
    case 'random-number-generator':
      return <RandomNumberGeneratorTool />;
    case 'text-counter':
      return <TextCounterTool />;
    case 'case-converter':
      return <CaseConverterTool />;
    case 'json-formatter':
      return <JSONFormatterTool />;
    case 'base64-converter':
      return <Base64ConverterTool />;
    case 'url-converter':
      return <URLConverterTool />;
    case 'hash-generator':
      return <HashGeneratorTool />;
    case 'color-converter':
      return <ColorConverterTool />;
    case 'time-zone-converter':
      return <TimeZoneConverterTool />;
    case 'unit-converter':
      return <UnitConverterTool />;
    case 'currency-converter':
      return <CurrencyConverterTool />;
    case 'emi-calculator':
      return <EMICalculatorTool />;
    case 'mortgage-calculator':
      return <MortgageCalculatorTool />;
    case 'tip-calculator':
      return <TipCalculatorTool />;
    case 'calorie-calculator':
      return <CalorieCalculatorTool />;
    case 'fuel-cost-calculator':
      return <FuelCostCalculatorTool />;
    case 'tax-calculator':
      return <TaxCalculatorTool />;
    case 'word-counter':
      return <WordCounterTool />;
    case 'character-counter':
      return <CharacterCounterTool />;
    case 'reading-time-calculator':
      return <ReadingTimeCalculatorTool />;
    case 'remove-duplicates':
      return <RemoveDuplicatesTool />;
    case 'random-name-picker':
      return <RandomNamePickerTool />;
    case 'barcode-generator':
      return <BarcodeGeneratorTool />;
    case 'qr-code-scanner':
      return <QRCodeScannerTool />;
    case 'image-compressor':
      return <ImageCompressorTool />;
    case 'image-resizer':
      return <ImageResizerTool />;
    case 'image-format-converter':
      return <ImageFormatConverterTool />;
    case 'pdf-merge':
      return <PDFMergeTool />;
    case 'pdf-split':
      return <PDFSplitTool />;
    case 'pdf-compress':
      return <PDFCompressTool />;
    case 'pdf-to-image':
      return <PDFToImageTool />;
    case 'image-to-pdf':
      return <ImageToPDFTool />;
    default:
      return <ComingSoonTool />;
  }
}

// Import all tool components from centralized index
import {
  AgeCalculatorTool,
  DateDifferenceTool,
  BMICalculatorTool,
  PasswordGeneratorTool,
  PasswordStrengthTool,
  QRCodeGeneratorTool,
  UUIDGeneratorTool,
  RandomNumberGeneratorTool,
  TextCounterTool,
  CaseConverterTool,
  JSONFormatterTool,
  Base64ConverterTool,
  URLConverterTool,
  HashGeneratorTool,
  ColorConverterTool,
  TimeZoneConverterTool,
  UnitConverterTool,
  CurrencyConverterTool,
  EMICalculatorTool,
  MortgageCalculatorTool,
  TipCalculatorTool,
  CalorieCalculatorTool,
  FuelCostCalculatorTool,
  TaxCalculatorTool,
  PercentageCalculatorTool,
  WordCounterTool,
  CharacterCounterTool,
  ReadingTimeCalculatorTool,
  RemoveDuplicatesTool,
  RandomNamePickerTool,
  BarcodeGeneratorTool,
  QRCodeScannerTool,
  ImageCompressorTool,
  ImageResizerTool,
  ImageFormatConverterTool,
  PDFMergeTool,
  PDFSplitTool,
  PDFCompressTool,
  PDFToImageTool,
  ImageToPDFTool,
  ComingSoonTool,
} from '@/components/tools';
