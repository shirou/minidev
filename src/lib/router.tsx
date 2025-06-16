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
        ],
      },
    ],
  },
])