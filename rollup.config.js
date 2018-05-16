import jscc from 'rollup-plugin-jscc'
import license from 'rollup-plugin-license'
import cp from 'rollup-plugin-cp'
import browsersync from 'rollup-plugin-browsersync'
import pkg from './package.json'
import uglify from 'rollup-plugin-uglify'

const isWatching = process.argv.includes('-w') || process.argv.includes('--watch')
const browsersyncPlugin = isWatching && browsersync()

const getPlugins = ({minify = false} = {}) => [
  cp({'src/icons': 'dist/uploadcare.tinymce/icons/'}),
  license({
    banner: `
      <%= pkg.name %> <%= pkg.version %>
      <%= pkg.description %>
      <%= pkg.homepage %>
      Date: <%= moment().format('YYYY-MM-DD') %>
    `,
  }),
  jscc({values: {_WIDGET_VERSION: pkg.widgetVersion}}),
  browsersyncPlugin,
  minify && uglify(),
]

export default [
  {
    input: 'src/uploadcare-tinymce.js',
    plugins: getPlugins({minify: false}),
    output: {
      file: 'dist/uploadcare.tinymce/plugin.js',
      format: 'iife',
    },
  },
  {
    input: 'src/uploadcare-tinymce.js',
    plugins: getPlugins({minify: true}),
    output: {
      file: 'dist/uploadcare.tinymce/plugin.min.js',
      format: 'iife',
    },
  },
]
