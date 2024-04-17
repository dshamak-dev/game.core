const esbuild = require("esbuild");
const { copy } = require("esbuild-plugin-copy");
const CssModulesPlugin = require("esbuild-css-modules-plugin");
const path = require("path");
const postcss = require("esbuild-postcss");

const outputPath = path.join(process.cwd(), "../public/");

const watch = process.argv.includes("--watch");
const minify = process.argv.includes("--minify");

const config = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  outfile: path.join(outputPath, "index.js"),
  minify: minify,
  plugins: [
    postcss(),
    CssModulesPlugin({
      force: true,
      emitDeclarationFile: true,
      localsConvention: "camelCaseOnly",
      namedExports: true,
      inject: false,
    }),
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./src/**/*.html"],
        to: [outputPath],
      },
      watch: watch,
    }),
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./assets/*"],
        to: [path.join(outputPath, "assets/")],
      },
      watch: watch,
    }),
  ],
};

if (watch) {
  config.plugins.push({
    name: "watch-plugin",
    setup(build) {
      build.onStart(() => {
        console.clear();
      });
      build.onEnd((result) => {
        if (result?.errors?.length) {
        } else {
          console.log("watching...");
        }
      });
    },
  });
}

async function run() {
  if (watch) {
    // config.minify = false;
    try {
      ctx = await esbuild.context(config);
      await ctx.watch();
    } catch (error) {
      console.log("error", error);
    }
  } else {
    config.minify = true;
    ctx = await esbuild.build(config);
    console.log("build successful");
  }
}

run();
