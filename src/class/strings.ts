
class Strings {

    public static camelize (text: string): string {
        const a = text
        .toLowerCase()
            .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
        
      return a.substring(0, 1).toLowerCase() + a.substring(1);
    }
}

export {Strings};
