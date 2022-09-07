import Resizer from "react-image-file-resizer";


class ResizeFile {

    async social(file) {
        if (file) {
            if (file.type === "image/gif") {
                return new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        file,
                        1600,
                        1600,
                        "gif",
                        50,
                        0,
                        (uri) => {
                            resolve(uri);
                        },
                        "file"
                    );
                });
            } else {
                return new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        file,
                        1600,
                        1600,
                        "WEBP",
                        50,
                        0,
                        (uri) => {
                            resolve(uri);
                        },
                        "file"
                    );
                });

            }
        }
    }

    async profile(file) {
        if (file) {
            return new Promise((resolve) => {
                Resizer.imageFileResizer(
                    file,
                    600,
                    600,
                    "WEBP",
                    50,
                    0,
                    (uri) => {
                        resolve(uri);
                    },
                    "file"
                );
            });
        }
    }
}

export default new ResizeFile();