import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const TODOS = [
    { id: "1", title: "ทำการบ้านนะจ๊ะ", done: true, priority: "high" },
    { id: "2", title: "ไปซื้อของ", done: false, priority: "medium" },
    { id: "3", title: "ออกกำลังกาย", done: false, priority: "low" },
    { id: "4", title: "ทำอาหารเย็น", done: true, priority: "medium" }
];

const PRIORITIES = ["low", "medium", "high"];

function isValidPriority(req, res, next) {
    const { title } = req.body ?? {};

    // 1. ตรวจสอบ title
    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" });
    }

    // 2. ตรวจสอบและปรับแต่ง priority
    if (req.body.priority !== undefined) {
        // แปลงเป็นตัวพิมพ์เล็กและตัดช่องว่าง
        const normalizedPriority = String(req.body.priority).toLowerCase().trim();
        
        if (!PRIORITIES.includes(normalizedPriority)) {
            return res.status(400).json({ 
                error: `priority ไม่ถูกต้อง (ต้องเป็น ${PRIORITIES.join(", ")})` 
            });
        }
        
        req.body.priority = normalizedPriority; // บันทึกค่าที่ถูกจัดรูปแบบแล้ว
    }

    return next();
}

// GET /health
app.get('/health', (_req, res) => {
    res.json({ status: "ok" });
});

const todoRouter = express.Router();

// GET /api/v1/todos (ดึงรายการทั้งหมด)
todoRouter.get('/', (_req, res) => {
    res.json(TODOS.map((t) => ({ ...t })));
});

// POST /api/v1/todos (สร้างรายการใหม่)
todoRouter.post('/', isValidPriority, (req, res) => {
    const created = {
        id: String(TODOS.length + 1),
        title: req.body.title.trim(),
        done: typeof req.body.done === 'boolean' ? req.body.done : false,
        priority: req.body.priority ?? "medium" // Default เป็น "medium" หากไม่ได้ส่งมา
    };
    TODOS.push(created);
    res.status(201).json({ ...created });
});

// GET /api/v1/todos/:id (ดึงข้อมูลตาม ID)
todoRouter.get("/:id", (req, res) => {
    const todo = TODOS.find((t) => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
    }
    res.json({ ...todo });
});

// Mount Router
app.use('/api/v1/todos', todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});