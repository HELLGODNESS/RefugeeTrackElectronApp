const { client } = require("../utils/prisma-client");
const path = require("path");

module.exports = {
  async getAllPersons(req, res) {
    try {
      const { page = 0, limit = 20, search } = req.query;
      const where = {
        deletedAt: null,
        ...(+search >= 1
          ? { id: +search }
          : {
              OR: [
                { firstName: { contains: search } },
                { lastName: { contains: search } },
                { emailAddress: { contains: search } },
                { cell: { contains: search } },
              ],
            }),
      };
      const persons = await client.person.findMany({
        where,
        skip: +page < 1 ? 0 : +page * limit,
        take: +limit,
        include: {
          Family: true,
          Documents: true,
        },
      });
      const count = await client.person.count({ where });
      res.json({ list: persons, count });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  async getPersonByID(req, res) {
    try {
      const { id } = req.query;
      const persons = await client.person.findFirst({
        where: {
          id: +id,
        },
        include: {
          Family: true,
          Documents: true,
        },
      });
      res.json({ persons });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  async createPerson(req, res) {
    try {
      const { body, files } = req;
      const image = files?.["SelectedImages"]?.[0].filename;
      const documentUrls = req.files?.["Docs"]?.map((file) => ({
        documentName: file.filename,
      }));

      const { bornOn, family, ...rest } = body;
      const familyArray = family ? JSON.parse(family) : [];
      const person = await client.person.create({
        data: {
          ...rest,
          ...(image && { image }),
          ...(bornOn && {
            bornOn: new Date(bornOn).toISOString(),
          }),
          ...(familyArray.length && {
            Family: {
              create: familyArray,
            },
          }),
          ...(documentUrls &&
            documentUrls.length && {
              Documents: {
                create: documentUrls,
              },
            }),
        },
      });
      res.status(201).json(person);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
  async updatePerson(req, res) {
    try {
      const { body, files } = req;
      const image = files?.["SelectedImages"]?.[0].filename;
      const documentUrls = req.files?.["Docs"]?.map((file) => ({
        documentName: file.filename,
      }));

      const { id, bornOn, family,Family,Documents, ...rest } = body;
      const familyArray = family ? JSON.parse(family) : [];
      const person = await client.person.update({
        where: {
          id: +id,
        },
        data: {
          ...rest,
          ...(image && { image }),
          ...(bornOn && {
            bornOn: new Date(bornOn).toISOString(),
          }),
          ...(familyArray.length > 0 && {
            Family: {
              create: familyArray,
            },
          }),
          ...(documentUrls &&
            documentUrls.length && {
              Documents: {
                create: documentUrls,
              },
            }),
        },
      });
      res.status(201).json(person);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },

  async deletePerson(req, res) {
    try {
      const { id } = req.query;
      const serviceDeleted = await client.person.update({
        where: {
          id: +id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      res.status(201).json(serviceDeleted);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
  // Add other controller methods as needed
};
