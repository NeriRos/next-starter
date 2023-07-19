const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")
const nextJest = require("next/jest")

const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
}

const createJestConfig = nextJest({
    dir: "./",
})(customJestConfig)

module.exports = async () => {
    const jestConfig = await createJestConfig()

    // Custom `moduleNameMapper` configuration
    const moduleNameMapper = {
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
        ...jestConfig.moduleNameMapper,
    }
    
    return { ...jestConfig, moduleNameMapper }
}