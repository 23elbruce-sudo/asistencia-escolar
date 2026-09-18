-- =====================================================
-- SISTEMA DE ASISTENCIA ESCOLAR
-- Colegio Cristóbal de las Américas
-- Schema completo para Supabase / PostgreSQL
-- =====================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. ADMINISTRADORES
-- =====================================================
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('principal', 'limited')),
  password_hash TEXT,                    -- si se usa auth propio; preferible Supabase Auth
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 2. DOCENTES
-- =====================================================
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_code TEXT UNIQUE,
  full_name TEXT NOT NULL,
  short_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 3. DISPOSITIVOS VINCULADOS (Device Binding)
-- =====================================================
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  device_token TEXT UNIQUE NOT NULL,
  device_name TEXT,
  user_agent TEXT,
  activated_at TIMESTAMPTZ DEFAULT now(),
  last_seen_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  revoked_at TIMESTAMPTZ
);

CREATE INDEX idx_devices_token ON devices(device_token);
CREATE INDEX idx_devices_teacher ON devices(teacher_id);

-- =====================================================
-- 4. GRUPOS (6 grupos fijos)
-- =====================================================
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade SMALLINT NOT NULL CHECK (grade IN (1, 2, 3)),
  letter CHAR(1) NOT NULL CHECK (letter IN ('A', 'B')),
  name TEXT GENERATED ALWAYS AS (grade::TEXT || '° ' || letter) STORED,
  UNIQUE(grade, letter)
);

-- Insertar los 6 grupos
INSERT INTO groups (grade, letter) VALUES
(1, 'A'), (1, 'B'),
(2, 'A'), (2, 'B'),
(3, 'A'), (3, 'B');

-- =====================================================
-- 5. ALUMNOS
-- =====================================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_code TEXT UNIQUE,               -- matrícula
  full_name TEXT NOT NULL,
  group_id UUID NOT NULL REFERENCES groups(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_students_group ON students(group_id);
CREATE INDEX idx_students_code ON students(student_code);

-- =====================================================
-- 6. MATERIAS
-- =====================================================
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  short_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 7. PERIODOS FIJOS DEL DÍA
-- =====================================================
CREATE TABLE periods (
  id SMALLINT PRIMARY KEY,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  name TEXT NOT NULL
);

INSERT INTO periods (id, start_time, end_time, name) VALUES
(1, '07:00', '07:50', '1er periodo'),
(2, '07:55', '08:45', '2do periodo'),
(3, '08:50', '09:40', '3er periodo'),
(4, '10:00', '10:50', '4to periodo'),
(5, '10:55', '11:45', '5to periodo'),
(6, '11:50', '12:40', '6to periodo'),
(7, '13:00', '13:50', '7mo periodo'),
(8, '13:55', '14:45', '8vo periodo');

-- =====================================================
-- 8. HORARIOS (corazón del sistema)
-- =====================================================
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id),
  group_id UUID NOT NULL REFERENCES groups(id),
  subject_id UUID NOT NULL REFERENCES subjects(id),
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 5), -- 1=Lunes ... 5=Viernes
  period_id SMALLINT NOT NULL REFERENCES periods(id),
  academic_year TEXT DEFAULT '2026-2027',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  -- Un docente no puede tener dos clases a la misma hora
  UNIQUE(teacher_id, day_of_week, period_id, academic_year),
  -- Un grupo no puede tener dos clases a la misma hora
  UNIQUE(group_id, day_of_week, period_id, academic_year)
);

CREATE INDEX idx_schedules_teacher_day_period ON schedules(teacher_id, day_of_week, period_id);
CREATE INDEX idx_schedules_group_day_period ON schedules(group_id, day_of_week, period_id);

-- =====================================================
-- 9. SESIONES DE ASISTENCIA (una por clase por día)
-- =====================================================
CREATE TABLE attendance_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL REFERENCES schedules(id),
  teacher_id UUID NOT NULL REFERENCES teachers(id),
  group_id UUID NOT NULL REFERENCES groups(id),
  subject_id UUID NOT NULL REFERENCES subjects(id),
  period_id SMALLINT NOT NULL REFERENCES periods(id),
  session_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'open', 'closed')),
  opened_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  registered_by_device_id UUID REFERENCES devices(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(schedule_id, session_date)
);

CREATE INDEX idx_attendance_sessions_date ON attendance_sessions(session_date);
CREATE INDEX idx_attendance_sessions_status ON attendance_sessions(status);
CREATE INDEX idx_attendance_sessions_teacher ON attendance_sessions(teacher_id);

-- =====================================================
-- 10. REGISTROS INDIVIDUALES DE ASISTENCIA
-- =====================================================
CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id),
  status TEXT NOT NULL DEFAULT 'present'
    CHECK (status IN ('present', 'absent', 'late')),
  marked_at TIMESTAMPTZ,
  marked_by_device_id UUID REFERENCES devices(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, student_id)
);

CREATE INDEX idx_attendance_records_session ON attendance_records(session_id);
CREATE INDEX idx_attendance_records_student ON attendance_records(student_id);

-- =====================================================
-- 11. BITÁCORA DE CORRECCIONES (Audit Log)
-- =====================================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('update', 'create', 'delete')),
  old_data JSONB,
  new_data JSONB,
  changed_by UUID NOT NULL REFERENCES admins(id),
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_audit_log_record ON audit_log(record_id);
CREATE INDEX idx_audit_log_changed_by ON audit_log(changed_by);

-- =====================================================
-- 12. CÓDIGOS DE ACTIVACIÓN TEMPORALES (QR)
-- =====================================================
CREATE TABLE activation_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_by UUID REFERENCES admins(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_activation_codes_code ON activation_codes(code);

-- =====================================================
-- 13. CONFIGURACIÓN DEL SISTEMA
-- =====================================================
CREATE TABLE system_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para obtener el periodo actual según la hora
CREATE OR REPLACE FUNCTION get_current_period(p_time TIME DEFAULT CURRENT_TIME)
RETURNS SMALLINT AS $$
DECLARE
  v_period_id SMALLINT;
BEGIN
  SELECT id INTO v_period_id
  FROM periods
  WHERE p_time >= start_time AND p_time <= end_time
  LIMIT 1;
  
  RETURN v_period_id;
END;
$$ LANGUAGE plpgsql;

-- Función para cerrar sesiones automáticamente
CREATE OR REPLACE FUNCTION close_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE attendance_sessions s
  SET 
    status = 'closed',
    closed_at = now()
  FROM periods p
  WHERE s.period_id = p.id
    AND s.status = 'open'
    AND s.session_date = CURRENT_DATE
    AND CURRENT_TIME > p.end_time;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMENTARIOS
-- =====================================================
COMMENT ON TABLE devices IS 'Vinculación permanente de dispositivos de docentes';
COMMENT ON TABLE schedules IS 'Horario semanal: docente + día + periodo → grupo + materia';
COMMENT ON TABLE attendance_sessions IS 'Una sesión por clase por día';
COMMENT ON TABLE attendance_records IS 'Estado de cada alumno en una sesión (present/absent/late)';
COMMENT ON TABLE audit_log IS 'Bitácora de correcciones administrativas';
COMMENT ON TABLE activation_codes IS 'Códigos QR temporales para activar dispositivos';
