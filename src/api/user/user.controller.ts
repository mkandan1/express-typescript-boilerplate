import { Request, Response, NextFunction } from "express";
import { IController } from "@interfaces/controller";
import { prisma } from "@db/client";

export class ProductController implements IController {


  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, name } = req.body;

      if (!email || !name) {
        return res.status(400).json({ message: "email or name is missing" })
      }

      const existUser = await prisma.user.findUnique({ where: { email } });

      if (existUser) {
        return res.status(422).json({ message: "user with same email already exist. please login or create new account" })
      }

      const data = await prisma.user.create({ data: { email, name } });
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await prisma.user.findMany();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = "";
      if (!data) {
        res.status(404);
        throw new Error(`Product with id "${req.params.id}" does not exist`);
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = "";
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = ""
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}