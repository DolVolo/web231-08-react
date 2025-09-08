import { useState } from "react"; 
import { useForm } from "react-hook-form"; 
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"; 

// 1) Zod schema 
const TaskSchema = z.object({ 
    title: z.string().trim().min(1, "กรุณากรอกชื่องาน"), 
    // อนุญาตให้เว้นว่าง หรือเลือกค่าจากรายการ 
    type: z 
        .enum(["เรียน", "ทำงาน", "บ้าน", "อื่นๆ"]) 
        .optional() 
        .or(z.literal("")), 
    // input type="date" จะได้รูปแบบ YYYY-MM-DD 
    dueDate: z 
        .string() 
        .regex(/^\d{4}-\d{2}-\d{2}$/, "รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)") 
        .optional() 
        .or(z.literal("")), 
}); 

type Task = z.infer<typeof TaskSchema>; 

export default function TodoApp() { 
    const [tasks, setTasks] = useState<Task[]>([]); 

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitting }, 
    } = useForm<Task>({ 
        resolver: zodResolver(TaskSchema), 
        defaultValues: { title: "", type: "", dueDate: "" }, 
        mode: "onSubmit", 
    }); 

    const onAdd = (data: Task) => { 
        setTasks((prev) => [...prev, data]); 
        reset(); // เคลียร์ฟอร์มหลังเพิ่ม 
    }; 

    const deleteTask = (index: number) => {
        // เก็บรายการที่ index ไม่ตรงกับอันที่ต้องการลบ
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    }; 

    return ( 
        <div style={{ textAlign: "center", marginTop: "50px" }}> 
            <h1>Practice #3: My To-do List (React Hook Form + Zod)</h1> 

            <form onSubmit={handleSubmit(onAdd)} noValidate style={{ marginBottom: "20px" }}> 
                {/* ชื่องาน (บังคับ) */} 
                <div style={{ marginBottom: "10px" }}> 
                    <input 
                        placeholder="งานที่ต้องทำ" 
                        {...register("title")} 
                        style={{ marginRight: "5px", padding: "5px" }}
                    /> 
                    {errors.title && <div style={{ color: "red", fontSize: "12px" }}>{errors.title.message}</div>} 
                </div> 

                {/* ประเภทงาน (ไม่บังคับ) */} 
                <div style={{ marginBottom: "10px" }}> 
                    <select {...register("type")} style={{ marginRight: "5px", padding: "5px" }}> 
                        <option value="">เลือกประเภทงาน</option> 
                        <option value="เรียน">เรียน</option> 
                        <option value="ทำงาน">ทำงาน</option> 
                        <option value="บ้าน">งานบ้าน</option> 
                        <option value="อื่นๆ">อื่นๆ</option> 
                    </select> 
                    {errors.type && <div style={{ color: "red", fontSize: "12px" }}>{errors.type.message}</div>} 
                </div> 

                {/* วันที่ต้องส่ง (ไม่บังคับ) */} 
                <div style={{ marginBottom: "10px" }}> 
                    <input type="date" {...register("dueDate")} style={{ marginRight: "5px", padding: "5px" }} /> 
                    {errors.dueDate && <div style={{ color: "red", fontSize: "12px" }}>{errors.dueDate.message}</div>} 
                </div> 

                <button type="submit" disabled={isSubmitting} style={{ padding: "5px 15px" }}>
                    {isSubmitting ? "Adding..." : "Add"}
                </button> 
            </form> 

            <ul style={{ listStyle: "none", padding: 0 }}> 
                {tasks.map((t, idx) => ( 
                    <li key={idx} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}> 
                        <strong>{t.title}</strong>
                        {t.type && ` | ประเภท: ${t.type}`} 
                        {t.dueDate && ` | ส่ง: ${t.dueDate}`} 
                        <button 
                            onClick={() => deleteTask(idx)} 
                            style={{ marginLeft: "10px", color: "red", padding: "2px 8px" }} 
                        > 
                            ลบ 
                        </button> 
                    </li> 
                ))} 
            </ul> 
        </div> 
    ); 
} 