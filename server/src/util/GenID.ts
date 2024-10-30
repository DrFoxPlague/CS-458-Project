export default class GenID {
    static generateId(entityType: string) {
        const timestamp = Date.now().toString().substring(0,10); // Convert timestamp to base-36
        const random = Math.random().toString(36).substring(2, 10); // Random string
        return `${entityType}-${timestamp}-${random}`; // Custom format
    }

    static exhibit() {
        return this.generateId('exhibit');
    }

    static badge() {
        return this.generateId('badge');
    }

    static game() {
        return this.generateId('game');
    }
}