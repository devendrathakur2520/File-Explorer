module.exports = {
    content: ["./src/**/*.{js,jsx}"], // ✅ Scans all React files for Tailwind classes
    corePlugins: {
        preflight: false, // ❌ Disables all Tailwind resets
      },
    theme: {
      extend: {},
    },
    plugins: [],
  };