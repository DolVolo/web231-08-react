import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema for Parliament Member
const ParliamentMemberSchema = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().trim().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().trim().min(1, "กรุณากรอกนามสกุล"),
  photo: z.string().refine((value) => {
    if (!value) return true; // Allow empty
    // Check if it's a valid URL or base64 data
    try {
      new URL(value);
      return true;
    } catch {
      // Check if it's base64 data
      return value.startsWith('data:image/');
    }
  }, "กรุณากรอก URL รูปภาพที่ถูกต้องหรืออัปโหลดไฟล์รูปภาพ").optional().or(z.literal("")),
  workHistory: z.string().min(10, "กรุณากรอกประวัติการทำงานอย่างน้อย 10 ตัวอักษร"),
  achievements: z.string().min(10, "กรุณากรอกผลงานอย่างน้อย 10 ตัวอักษร"),
  ministerPosition: z.string().optional().or(z.literal("")),
  ministry: z.string().optional().or(z.literal("")),
  politicalParty: z.string().min(1, "กรุณาเลือกพรรคการเมือง"),
});

type ParliamentMember = z.infer<typeof ParliamentMemberSchema> & {
  id: string;
};

const prefixOptions = ["นาย", "นาง", "นางสาว", "ดร.", "ศ.ดร.", "รศ.ดร.", "พล.ต.", "พล.อ.", "พล.ร."];
const politicalParties = [
  "พรรคเพื่อไทย", "พรรคประชาธิปัตย์", "พรรคก้าวไกล", "พรรคภูมิใจไทย", "พรรคพลังประชารัฐ",
  "พรรคเศรษฐกิจใหม่", "พรรคชาติไทยพัฒนา", "พรรคกิจสร้างไทย", "พรรคเพื่อชาติ", "อื่นๆ"
];

const ministries = [
  "", "กระทรวงการคลัง", "กระทรวงการต่างประเทศ", "กระทรวงการท่องเที่ยวและกีฬา",
  "กระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์", "กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม",
  "กระทรวงกลาโหม", "กระทรวงคมนาคม", "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม",
  "กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม", "กระทรวงพลังงาน", "กระทรวงพาณิชย์",
  "กระทรวงมหาดไทย", "กระทรวงยุติธรรม", "กระทรวงแรงงาน", "กระทรวงวัฒนธรรม",
  "กระทรวงศึกษาธิการ", "กระทรวงสาธารณสุข", "กระทรวงอุตสาหกรรม", "กระทรวงเกษตรและสหกรณ์"
];

export default function ParliamentDirectory() {
  const [members, setMembers] = useState<ParliamentMember[]>([]);
  const [editingMember, setEditingMember] = useState<ParliamentMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Omit<ParliamentMember, "id">>({
    resolver: zodResolver(ParliamentMemberSchema),
    defaultValues: {
      prefix: "",
      firstName: "",
      lastName: "",
      photo: "",
      workHistory: "",
      achievements: "",
      ministerPosition: "",
      ministry: "",
      politicalParty: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: Omit<ParliamentMember, "id">) => {
    if (editingMember) {
      setMembers(prev => prev.map(member => 
        member.id === editingMember.id 
          ? { ...data, id: editingMember.id }
          : member
      ));
      setEditingMember(null);
    } else {
      const newMember: ParliamentMember = {
        ...data,
        id: Date.now().toString(),
      };
      setMembers(prev => [...prev, newMember]);
    }
    setPhotoPreview("");
    reset();
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const editMember = (member: ParliamentMember) => {
    setEditingMember(member);
    setPhotoPreview(member.photo || "");
    Object.entries(member).forEach(([key, value]) => {
      if (key !== "id") {
        setValue(key as keyof Omit<ParliamentMember, "id">, value);
      }
    });
  };

  const cancelEdit = () => {
    setEditingMember(null);
    setPhotoPreview("");
    reset();
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPhotoPreview(result);
          setValue("photo", result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (jpg, png, gif, etc.)');
      }
    }
  };

  // Handle URL input
  const handleUrlChange = (url: string) => {
    setPhotoPreview(url);
    setValue("photo", url);
  };

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("parliamentMembers");
    if (saved) {
      try {
        const parsed: ParliamentMember[] = JSON.parse(saved);
        setMembers(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("parliamentMembers", JSON.stringify(members));
  }, [members]);

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.politicalParty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.ministerPosition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.ministry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #ff6b6b 50%, #4ecdc4 75%, #45b7d1 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Animated floating shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        animation: 'float 10s ease-in-out infinite'
      }} />
      
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 3px 10px rgba(0,0,0,0.1); }
          50% { box-shadow: 0 5px 20px rgba(74, 144, 226, 0.3); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
      `}</style>
      {/* Colorful Header */}
      <div style={{
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
        textAlign: 'center',
        animation: 'slideInUp 0.8s ease-out',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          animation: 'shimmer 3s ease-in-out infinite'
        }} />
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          margin: '0 0 10px 0',
          animation: 'wiggle 2s ease-in-out infinite',
          position: 'relative',
          zIndex: 1
        }}>
          🏛️ Parliament Directory
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          fontSize: '1.2rem',
          margin: '0',
          position: 'relative',
          zIndex: 1
        }}>
          ระบบจัดการสมาชิกสภาผู้แทนราษฎร
        </p>
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Colorful Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '15px',
            padding: '25px',
            color: 'white',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            transform: 'scale(1)',
            transition: 'all 0.3s ease',
            animation: 'slideInUp 0.6s ease-out 0.2s both',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', opacity: '0.8', margin: '0 0 8px 0' }}>จำนวนสมาชิกทั้งหมด</p>
                <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '0' }}>{members.length}</p>
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                👥
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '15px',
            padding: '25px',
            color: 'white',
            boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)',
            transform: 'scale(1)',
            transition: 'all 0.3s ease',
            animation: 'slideInUp 0.6s ease-out 0.4s both',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(240, 147, 251, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.3)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', opacity: '0.8', margin: '0 0 8px 0' }}>รัฐมนตรี</p>
                <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '0' }}>{members.filter(m => m.ministerPosition).length}</p>
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                animation: 'pulse 2s ease-in-out infinite 0.5s'
              }}>
                🏛️
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '15px',
            padding: '25px',
            color: 'white',
            boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
            transform: 'scale(1)',
            transition: 'all 0.3s ease',
            animation: 'slideInUp 0.6s ease-out 0.6s both',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(79, 172, 254, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.3)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', opacity: '0.8', margin: '0 0 8px 0' }}>ผลการค้นหา</p>
                <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: '0' }}>{filteredMembers.length}</p>
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                animation: 'pulse 2s ease-in-out infinite 1s'
              }}>
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* Colorful Add/Edit Form */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
          borderRadius: '20px',
          padding: '0',
          marginBottom: '30px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          border: '3px solid #ff6b6b',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            padding: '20px',
            color: 'white'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              margin: '0 0 8px 0',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
              {editingMember ? "✏️ แก้ไขข้อมูลสมาชิก" : "➕ เพิ่มสมาชิกใหม่"}
            </h2>
            <p style={{ 
              margin: '0',
              opacity: '0.9'
            }}>
              {editingMember ? "อัปเดตข้อมูลสมาชิกสภา" : "กรอกข้อมูลสมาชิกสภาใหม่"}
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '30px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '45px', 
              marginBottom: '30px' 
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>คำนำหน้า</label>
                <select {...register("prefix")} style={{
                  width: '100%',
                  padding: '15px 18px',
                  borderRadius: '12px',
                  border: '2px solid #e1e8ed',
                  fontSize: '1rem',
                  background: 'white',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}>
                  <option value="">เลือกคำนำหน้า</option>
                  {prefixOptions.map(prefix => (
                    <option key={prefix} value={prefix}>{prefix}</option>
                  ))}
                </select>
                {errors.prefix && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '8px 0 0 0' }}>{errors.prefix.message}</p>}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>ชื่อ</label>
                <input
                  type="text"
                  {...register("firstName")}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '12px',
                    border: '2px solid #e1e8ed',
                    fontSize: '1rem',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4a90e2';
                    e.target.style.boxShadow = '0 5px 20px rgba(74, 144, 226, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e8ed';
                    e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  placeholder="กรอกชื่อ"
                />
                {errors.firstName && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '8px 0 0 0' }}>{errors.firstName.message}</p>}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>นามสกุล</label>
                <input
                  type="text"
                  {...register("lastName")}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '12px',
                    border: '2px solid #e1e8ed',
                    fontSize: '1rem',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="กรอกนามสกุล"
                />
                {errors.lastName && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '8px 0 0 0' }}>{errors.lastName.message}</p>}
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.9rem', 
                fontWeight: 'bold', 
                color: '#2c3e50',
                marginBottom: '8px'
              }}>📸 รูปประจำตัว</label>
              
              {photoPreview && (
                <div style={{ marginBottom: '15px' }}>
                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '15px',
                      objectFit: 'cover',
                      border: '3px solid #4ecdc4',
                      boxShadow: '0 5px 15px rgba(78, 205, 196, 0.3)'
                    }}
                    onError={() => setPhotoPreview("")}
                  />
                </div>
              )}
              
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    border: '2px dashed #4ecdc4',
                    borderRadius: '10px',
                    background: 'rgba(78, 205, 196, 0.1)',
                    fontSize: '0.9rem',
                    color: '#2c3e50'
                  }}
                />
              </div>
              
              <div>
                <input
                  type="url"
                  {...register("photo")}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '10px',
                    border: '2px solid #e1e8ed',
                    fontSize: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="หรือใส่ URL รูปภาพ"
                />
                {errors.photo && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '5px 0 0 0' }}>{errors.photo.message}</p>}
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '40px', 
              marginBottom: '30px' 
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>📋 ประวัติการทำงาน</label>
                <textarea
                  {...register("workHistory")}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '12px',
                    border: '2px solid #e1e8ed',
                    fontSize: '1rem',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                    resize: 'vertical',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  placeholder="กรอกประวัติการทำงาน..."
                />
                {errors.workHistory && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '8px 0 0 0' }}>{errors.workHistory.message}</p>}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>🏆 ผลงาน</label>
                <textarea
                  {...register("achievements")}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '12px',
                    border: '2px solid #e1e8ed',
                    fontSize: '1rem',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                    resize: 'vertical',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  placeholder="กรอกผลงานและความสำเร็จ..."
                />
                {errors.achievements && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '8px 0 0 0' }}>{errors.achievements.message}</p>}
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '40px', 
              marginBottom: '35px' 
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>🎖️ ตำแหน่งรัฐมนตรี</label>
                <input
                  type="text"
                  {...register("ministerPosition")}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '12px',
                    border: '2px solid #e1e8ed',
                    fontSize: '1rem',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="เช่น รัฐมนตรีว่าการกระทรวงการคลัง"
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>🏢 กระทรวง</label>
                <select {...register("ministry")} style={{
                  width: '100%',
                  padding: '15px 18px',
                  borderRadius: '12px',
                  border: '2px solid #e1e8ed',
                  fontSize: '1rem',
                  background: 'white',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}>
                  <option value="">เลือกกระทรวง</option>
                  {ministries.slice(1).map(ministry => (
                    <option key={ministry} value={ministry}>{ministry}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>🎭 พรรคการเมือง</label>
                <select {...register("politicalParty")} style={{
                  width: '100%',
                  padding: '15px 18px',
                  borderRadius: '12px',
                  border: '2px solid #e1e8ed',
                  fontSize: '1rem',
                  background: 'white',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}>
                  <option value="">เลือกพรรคการเมือง</option>
                  {politicalParties.map(party => (
                    <option key={party} value={party}>{party}</option>
                  ))}
                </select>
                {errors.politicalParty && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: '8px 0 0 0' }}>{errors.politicalParty.message}</p>}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              paddingTop: '20px', 
              borderTop: '2px solid #f1f5f9',
              justifyContent: 'center'
            }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 5px 15px rgba(255, 107, 107, 0.3)',
                  transition: 'all 0.3s ease',
                  minWidth: '150px',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.3)';
                  }
                }}
              >
                {isSubmitting ? "💾 กำลังบันทึก..." : editingMember ? "✏️ อัปเดต" : "➕ เพิ่มสมาชิก"}
              </button>
              
              {editingMember && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  style={{
                    background: 'linear-gradient(45deg, #95a5a6, #34495e)',
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(149, 165, 166, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: '120px'
                  }}
                >
                  ❌ ยกเลิก
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Colorful Search */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
          borderRadius: '20px',
          padding: '0',
          marginBottom: '30px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          border: '3px solid #4ecdc4',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
            padding: '20px',
            color: 'white'
          }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold', 
              margin: '0 0 8px 0',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>🔍 ค้นหาสมาชิก</h2>
            <p style={{ 
              margin: '0',
              opacity: '0.9'
            }}>ค้นหาด้วยชื่อ พรรค ตำแหน่ง หรือกระทรวง</p>
          </div>
          <div style={{ padding: '25px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                color: '#4ecdc4'
              }}>
                🔍
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '50px',
                  paddingRight: '20px',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  borderRadius: '15px',
                  border: '2px solid #e1e8ed',
                  fontSize: '1rem',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
                placeholder="ค้นหาด้วยชื่อ พรรค ตำแหน่ง หรือกระทรวง..."
              />
            </div>
          </div>
        </div>

        {/* Colorful Members List */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
          borderRadius: '20px',
          padding: '0',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          border: '3px solid #764ba2',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            padding: '20px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  margin: '0 0 8px 0',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}>👥 สมาชิกสภาผู้แทนราษฎร</h2>
                <p style={{ 
                  margin: '0',
                  opacity: '0.9'
                }}>จัดการและดูข้อมูลสมาชิกทั้งหมด</p>
              </div>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {filteredMembers.length} คน
              </span>
            </div>
          </div>
          
          <div style={{ padding: '25px' }}>
            {filteredMembers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 20px',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  👥
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  margin: '0 0 10px 0'
                }}>
                  {members.length === 0 ? "ยังไม่มีสมาชิก" : "ไม่พบสมาชิก"}
                </h3>
                <p style={{
                  color: '#7f8c8d',
                  margin: '0'
                }}>
                  {members.length === 0 ? "เริ่มต้นด้วยการเพิ่มสมาชิกสภาคนแรก" : "ลองปรับเปลี่ยนคำค้นหา"}
                </p>
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '20px' 
              }}>
                {filteredMembers.map((member, index) => (
                  <div key={member.id} style={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                    border: '2px solid transparent',
                    borderImage: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1) 1',
                    borderRadius: '15px',
                    padding: '20px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  }}>
                    {member.photo && (
                      <div style={{ marginBottom: '15px' }}>
                        <img
                          src={member.photo}
                          alt={`${member.firstName} ${member.lastName}`}
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '15px',
                            objectFit: 'cover',
                            border: '3px solid #4ecdc4',
                            boxShadow: '0 5px 15px rgba(78, 205, 196, 0.3)'
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <div style={{ marginBottom: '15px' }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        margin: '0 0 10px 0'
                      }}>
                        {member.prefix} {member.firstName} {member.lastName}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {member.politicalParty}
                      </span>
                      {member.ministerPosition && (
                        <div style={{ marginTop: '8px' }}>
                          <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {member.ministerPosition}
                          </span>
                          {member.ministry && (
                            <p style={{
                              fontSize: '0.7rem',
                              color: '#7f8c8d',
                              margin: '4px 0 0 0'
                            }}>{member.ministry}</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{
                        background: 'rgba(78, 205, 196, 0.1)',
                        padding: '12px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        border: '1px solid rgba(78, 205, 196, 0.3)'
                      }}>
                        <h4 style={{
                          fontWeight: 'bold',
                          color: '#2c3e50',
                          margin: '0 0 5px 0',
                          fontSize: '0.9rem'
                        }}>📋 ประวัติการทำงาน</h4>
                        <p style={{
                          color: '#34495e',
                          fontSize: '0.8rem',
                          lineHeight: '1.4',
                          margin: '0'
                        }}>{member.workHistory}</p>
                      </div>
                      
                      <div style={{
                        background: 'rgba(255, 107, 107, 0.1)',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 107, 107, 0.3)'
                      }}>
                        <h4 style={{
                          fontWeight: 'bold',
                          color: '#2c3e50',
                          margin: '0 0 5px 0',
                          fontSize: '0.9rem'
                        }}>🏆 ผลงาน</h4>
                        <p style={{
                          color: '#34495e',
                          fontSize: '0.8rem',
                          lineHeight: '1.4',
                          margin: '0'
                        }}>{member.achievements}</p>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      paddingTop: '15px',
                      borderTop: '2px solid #f1f5f9'
                    }}>
                      <button
                        onClick={() => editMember(member)}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                          color: 'white',
                          padding: '10px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          boxShadow: '0 3px 10px rgba(79, 172, 254, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ✏️ แก้ไข
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(45deg, #ff6b6b, #ee5a6f)',
                          color: 'white',
                          padding: '10px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          boxShadow: '0 3px 10px rgba(255, 107, 107, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        🗑️ ลบ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
