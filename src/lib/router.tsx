import { createBrowserRouter } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import HomePage from '@/pages/home'
import AboutPage from '@/pages/about'

// Tool pages
import RandomStringPage from '@/pages/tools/random-string'
import JsonToYamlPage from '@/pages/tools/json-to-yaml'
import YamlToJsonPage from '@/pages/tools/yaml-to-json'
import ToUnixTimePage from '@/pages/tools/to-unix-time'
import FromUnixTimePage from '@/pages/tools/from-unix-time'
import XmlFormatterPage from '@/pages/tools/xml-formatter'
import SqlFormatterPage from '@/pages/tools/sql-formatter'
import Base64EncoderPage from '@/pages/tools/base64-encoder'
import Base64DecoderPage from '@/pages/tools/base64-decoder'
import UUIDGeneratorPage from '@/pages/tools/uuid-generator'
import JSONFormatterPage from '@/pages/tools/json-formatter'
import ChmodCalculatorPage from '@/pages/tools/chmod-calculator'
import URLEncoderPage from '@/pages/tools/url-encoder'
import URLDecoderPage from '@/pages/tools/url-decoder'
import HtmlEncoderPage from '@/pages/tools/html-encoder'
import CaseConverterPage from '@/pages/tools/case-converter'
import NumberBaseConverterPage from '@/pages/tools/number-base-converter'
import TemperatureConverterPage from '@/pages/tools/temperature-converter'
import DataSizeConverterPage from '@/pages/tools/data-size-converter'
import LoremIpsumGeneratorPage from '@/pages/tools/lorem-ipsum-generator'
import WordCounterPage from '@/pages/tools/word-counter'
import StringUtilitiesPage from '@/pages/tools/string-utilities'
import WiFiQRCodeGeneratorPage from '@/pages/tools/wifi-qrcode-generator'
import ColorConverterPage from '@/pages/tools/color-converter'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'tools',
        children: [
          {
            path: 'random-string',
            element: <RandomStringPage />,
          },
          {
            path: 'json-to-yaml',
            element: <JsonToYamlPage />,
          },
          {
            path: 'yaml-to-json',
            element: <YamlToJsonPage />,
          },
          {
            path: 'to-unix-time',
            element: <ToUnixTimePage />,
          },
          {
            path: 'from-unix-time',
            element: <FromUnixTimePage />,
          },
          {
            path: 'xml-formatter',
            element: <XmlFormatterPage />,
          },
          {
            path: 'sql-formatter',
            element: <SqlFormatterPage />,
          },
          {
            path: 'base64-encoder',
            element: <Base64EncoderPage />,
          },
          {
            path: 'base64-decoder',
            element: <Base64DecoderPage />,
          },
          {
            path: 'uuid-generator',
            element: <UUIDGeneratorPage />,
          },
          {
            path: 'json-formatter',
            element: <JSONFormatterPage />,
          },
          {
            path: 'chmod-calculator',
            element: <ChmodCalculatorPage />,
          },
          {
            path: 'url-encoder',
            element: <URLEncoderPage />,
          },
          {
            path: 'url-decoder',
            element: <URLDecoderPage />,
          },
          {
            path: 'html-encoder',
            element: <HtmlEncoderPage />,
          },
          {
            path: 'case-converter',
            element: <CaseConverterPage />,
          },
          {
            path: 'number-base-converter',
            element: <NumberBaseConverterPage />,
          },
          {
            path: 'temperature-converter',
            element: <TemperatureConverterPage />,
          },
          {
            path: 'data-size-converter',
            element: <DataSizeConverterPage />,
          },
          {
            path: 'lorem-ipsum-generator',
            element: <LoremIpsumGeneratorPage />,
          },
          {
            path: 'word-counter',
            element: <WordCounterPage />,
          },
          {
            path: 'string-utilities',
            element: <StringUtilitiesPage />,
          },
          {
            path: 'wifi-qrcode-generator',
            element: <WiFiQRCodeGeneratorPage />,
          },
          {
            path: 'color-converter',
            element: <ColorConverterPage />,
          },
        ],
      },
    ],
  },
])