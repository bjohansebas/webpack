"use strict";

const ExportsInfo = require("../lib/ExportsInfo");

const { ExportInfo } = ExportsInfo;

describe("ExportInfo", () => {
	describe("resetProvideInfo", () => {
		it("clears the pure-provide bit so a rebuilt impure export is not left marked pure", () => {
			const info = new ExportInfo("foo");
			info.pureProvide = true;
			expect(info.pureProvide).toBe(true);

			info.resetProvideInfo();

			// FlagDependencyExports only ever sets pureProvide true, so without the
			// reset an export that turned impure would incorrectly stay pure
			expect(info.pureProvide).toBeUndefined();
		});
	});

	describe("resetUseInfo", () => {
		it("preserves the pure-provide bit (provide info is untouched)", () => {
			const info = new ExportInfo("foo");
			info.pureProvide = true;

			info.resetUseInfo();

			expect(info.pureProvide).toBe(true);
		});
	});
});

describe("ExportsInfo", () => {
	it("resetProvidedExports clears the pure-provide bit on every export", () => {
		const exportsInfo = new ExportsInfo();
		const info = exportsInfo.getExportInfo("foo");
		info.pureProvide = true;
		exportsInfo.otherExportsInfo.pureProvide = true;

		exportsInfo.resetProvidedExports();

		expect(exportsInfo.getExportInfo("foo").pureProvide).toBeUndefined();
		expect(exportsInfo.otherExportsInfo.pureProvide).toBeUndefined();
	});
});
