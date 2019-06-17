import jscc from 'rollup-plugin-jscc'
import license from 'rollup-plugin-license'
import cpy from 'rollup-plugin-cpy'
import pkg from './package.json'
import {uglify} from 'rollup-plugin-uglify'
import svgo from 'rollup-plugin-svgo'

const getPlugins = ({minify = false} = {}) => [
  svgo({raw: true}),
  cpy({
    files: 'src/icons',
    dest: 'dist/uploadcare.tinymce/icons/',
    options: {verbose: true},
  }),
  license({
    banner: `
      <%= pkg.name %> <%= pkg.version %>
      <%= pkg.description %>
      <%= pkg.homepage %>
      Date: <%= moment().format('YYYY-MM-DD') %>
    `,
  }),
  jscc({values: {_WIDGET_VERSION: pkg.widgetVersion}}),
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
