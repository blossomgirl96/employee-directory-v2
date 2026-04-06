import express from "express";
import employees from "#db/employees";

const router = express.Router();
export default router;

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/", (req, res) => {
  res.send(employees);
});

router.post("/", (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).send("Request must include a name.");
  }
  const newEmployee = { id: employees.length + 1, name: req.body.name };
  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});

router.get("/:id", (req, res) => {
  const employee = employees.find((e) => e.id === +req.params.id);
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.send(employee);
});
