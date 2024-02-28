
const { validationResult } = require("express-validator");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const Cars = db.cars;
const Bridge = db.bridge;

exports.imageAccess = async (req, res, next) => {
    try {
       
        const userId = req.user.id
        console.log(userId)
        // Check if the document access is granted for the user in the Bridge table
        const bridgeRecord = await Bridge.findOne({
            where: { userId:userId, document_access: 'granted' },
            include: {
                model: Cars
              }
        });

        if (bridgeRecord && bridgeRecord.car) {
            // If document access is granted and car is found, you can do something with the document
            // For example, you can send the document as a response
           next({ document: bridgeRecord });
        } else {
            // Handle case where document access is not granted or car is not found
            return res.status(403).json({ message: "Document access not granted or car not found" });
        }
    } catch (error) {
        // Handle any errors that occur
        console.error("Error in imageAccess middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
