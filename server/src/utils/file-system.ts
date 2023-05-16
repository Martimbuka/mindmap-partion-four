import fs from 'fs';

export const read: (path: string) => Promise<string> = async (path: string) => {
    return new Promise((resolve, rejects) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            let result: string = '';
            if (err) {
                result = 'Cannot read file';
                rejects(err);
                return;
            }

            result = data.toString();
            resolve(result);
        });
    });
}

export const write: (path: string, data: string) => Promise<string> = async (path: string, data: string) => {
    return new Promise((resolve, rejects) => {
        fs.writeFile(path, data, (err) => {
            let result: string = '';

            if (err) {
                result = 'Cannot write file';
                rejects(result);
                return;
            }

            result = 'File written successfully'
            resolve(result);
        });
    });
}