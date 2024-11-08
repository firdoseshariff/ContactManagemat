import {defineConfig} from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import fs from 'fs';

export default defineConfig({
    plugins:[angular()],
    server:
    {
https:{
key:fs.readFileSync('/localhost.key'),
cert:fs.readFileSync('/localhost.crt')
    }}
});