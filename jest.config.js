module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
    },
    moduleFileExtensions: ["ts", "js", "json", "node"], // Recognize these file types
  };
  