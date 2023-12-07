
export class Templates {

    public static jsonTemplate (iconsPath: any) {
        return JSON.stringify(iconsPath);
    }

    public static tsTemplate (iconsPath: any) {
        return `export const iconsPaths = ${JSON.stringify(iconsPath)}`;
    }

    public static jsTemplate (iconsPath: any) {
        return `export const iconsPaths = ${JSON.stringify(iconsPath)}`;
    }
}