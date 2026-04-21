export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agendamentos: {
        Row: {
          confirmacao_enviada: boolean | null
          conversa_id: string | null
          created_at: string | null
          created_by: string | null
          dados_qualificacao: Json | null
          data_fim: string
          data_inicio: string
          dealership_id: string
          google_event_id: string | null
          ical_uid: string | null
          id: string
          lead_cpf: string | null
          lead_email: string | null
          lead_id: string | null
          lead_nome: string
          lead_telefone: string | null
          lembrete_1h_enviado: boolean | null
          lembrete_24h_enviado: boolean | null
          observacoes: string | null
          observacoes_internas: string | null
          origem: string | null
          outlook_event_id: string | null
          resultado: string | null
          resultado_notas: string | null
          salesperson_id: string | null
          status: string | null
          tipo: string | null
          updated_at: string | null
          vehicle_id: string | null
          veiculo_interesse: string | null
        }
        Insert: {
          confirmacao_enviada?: boolean | null
          conversa_id?: string | null
          created_at?: string | null
          created_by?: string | null
          dados_qualificacao?: Json | null
          data_fim: string
          data_inicio: string
          dealership_id: string
          google_event_id?: string | null
          ical_uid?: string | null
          id?: string
          lead_cpf?: string | null
          lead_email?: string | null
          lead_id?: string | null
          lead_nome: string
          lead_telefone?: string | null
          lembrete_1h_enviado?: boolean | null
          lembrete_24h_enviado?: boolean | null
          observacoes?: string | null
          observacoes_internas?: string | null
          origem?: string | null
          outlook_event_id?: string | null
          resultado?: string | null
          resultado_notas?: string | null
          salesperson_id?: string | null
          status?: string | null
          tipo?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
          veiculo_interesse?: string | null
        }
        Update: {
          confirmacao_enviada?: boolean | null
          conversa_id?: string | null
          created_at?: string | null
          created_by?: string | null
          dados_qualificacao?: Json | null
          data_fim?: string
          data_inicio?: string
          dealership_id?: string
          google_event_id?: string | null
          ical_uid?: string | null
          id?: string
          lead_cpf?: string | null
          lead_email?: string | null
          lead_id?: string | null
          lead_nome?: string
          lead_telefone?: string | null
          lembrete_1h_enviado?: boolean | null
          lembrete_24h_enviado?: boolean | null
          observacoes?: string | null
          observacoes_internas?: string | null
          origem?: string | null
          outlook_event_id?: string | null
          resultado?: string | null
          resultado_notas?: string | null
          salesperson_id?: string | null
          status?: string | null
          tipo?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
          veiculo_interesse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_salesperson_id_fkey"
            columns: ["salesperson_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_alerts: {
        Row: {
          action: string | null
          action_data: Json | null
          created_at: string
          dealership_id: string
          id: string
          is_dismissed: boolean
          is_read: boolean
          message: string
          sent_whatsapp: boolean
          title: string
          type: string
          vehicle_id: string | null
        }
        Insert: {
          action?: string | null
          action_data?: Json | null
          created_at?: string
          dealership_id: string
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          message: string
          sent_whatsapp?: boolean
          title: string
          type: string
          vehicle_id?: string | null
        }
        Update: {
          action?: string | null
          action_data?: Json | null
          created_at?: string
          dealership_id?: string
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          message?: string
          sent_whatsapp?: boolean
          title?: string
          type?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_alerts_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_alerts_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_alerts_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_cache: {
        Row: {
          cache_key: string
          created_at: string
          dealership_id: string
          expires_at: string
          id: string
          result: Json
        }
        Insert: {
          cache_key: string
          created_at?: string
          dealership_id: string
          expires_at: string
          id?: string
          result: Json
        }
        Update: {
          cache_key?: string
          created_at?: string
          dealership_id?: string
          expires_at?: string
          id?: string
          result?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ai_cache_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          context: Json
          created_at: string
          dealership_id: string
          id: string
          messages: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          context?: Json
          created_at?: string
          dealership_id: string
          id?: string
          messages?: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          context?: Json
          created_at?: string
          dealership_id?: string
          id?: string
          messages?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account: string | null
          agency: string | null
          balance: number | null
          bank_external_id: string | null
          bank_id: string | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          account?: string | null
          agency?: string | null
          balance?: number | null
          bank_external_id?: string | null
          bank_id?: string | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          account?: string | null
          agency?: string | null
          balance?: number | null
          bank_external_id?: string | null
          bank_id?: string | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_bank_id_fkey"
            columns: ["bank_id"]
            isOneToOne: false
            referencedRelation: "banks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      banks: {
        Row: {
          account: string | null
          agency: string | null
          code: string | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          name: string
        }
        Insert: {
          account?: string | null
          agency?: string | null
          code?: string | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          name: string
        }
        Update: {
          account?: string | null
          agency?: string | null
          code?: string | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "banks_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      calendario_config: {
        Row: {
          antecedencia_maxima_dias: number | null
          antecedencia_minima_horas: number | null
          created_at: string | null
          dealership_id: string | null
          distribuicao_automatica: boolean | null
          duracao_padrao_minutos: number | null
          id: string
          intervalo_entre_slots: number | null
          lembrete_1h: boolean | null
          lembrete_24h: boolean | null
          max_agendamentos_por_slot: number | null
          metodo_distribuicao: string | null
          notificar_email: boolean | null
          notificar_whatsapp: boolean | null
          ultimo_salesperson_id: string | null
          updated_at: string | null
          widget_ativo: boolean | null
          widget_avatar_url: string | null
          widget_cor: string | null
          widget_mensagem_inicial: string | null
          widget_posicao: string | null
        }
        Insert: {
          antecedencia_maxima_dias?: number | null
          antecedencia_minima_horas?: number | null
          created_at?: string | null
          dealership_id?: string | null
          distribuicao_automatica?: boolean | null
          duracao_padrao_minutos?: number | null
          id?: string
          intervalo_entre_slots?: number | null
          lembrete_1h?: boolean | null
          lembrete_24h?: boolean | null
          max_agendamentos_por_slot?: number | null
          metodo_distribuicao?: string | null
          notificar_email?: boolean | null
          notificar_whatsapp?: boolean | null
          ultimo_salesperson_id?: string | null
          updated_at?: string | null
          widget_ativo?: boolean | null
          widget_avatar_url?: string | null
          widget_cor?: string | null
          widget_mensagem_inicial?: string | null
          widget_posicao?: string | null
        }
        Update: {
          antecedencia_maxima_dias?: number | null
          antecedencia_minima_horas?: number | null
          created_at?: string | null
          dealership_id?: string | null
          distribuicao_automatica?: boolean | null
          duracao_padrao_minutos?: number | null
          id?: string
          intervalo_entre_slots?: number | null
          lembrete_1h?: boolean | null
          lembrete_24h?: boolean | null
          max_agendamentos_por_slot?: number | null
          metodo_distribuicao?: string | null
          notificar_email?: boolean | null
          notificar_whatsapp?: boolean | null
          ultimo_salesperson_id?: string | null
          updated_at?: string | null
          widget_ativo?: boolean | null
          widget_avatar_url?: string | null
          widget_cor?: string | null
          widget_mensagem_inicial?: string | null
          widget_posicao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendario_config_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: true
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendario_config_ultimo_salesperson_id_fkey"
            columns: ["ultimo_salesperson_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      calendario_integracoes: {
        Row: {
          access_token: string | null
          calendar_id: string | null
          created_at: string | null
          dealership_id: string | null
          employee_id: string | null
          id: string
          last_sync: string | null
          provider: string
          refresh_token: string | null
          sync_direction: string | null
          sync_enabled: boolean | null
          sync_errors: Json | null
          token_expiry: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string | null
          dealership_id?: string | null
          employee_id?: string | null
          id?: string
          last_sync?: string | null
          provider: string
          refresh_token?: string | null
          sync_direction?: string | null
          sync_enabled?: boolean | null
          sync_errors?: Json | null
          token_expiry?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string | null
          dealership_id?: string | null
          employee_id?: string | null
          id?: string
          last_sync?: string | null
          provider?: string
          refresh_token?: string | null
          sync_direction?: string | null
          sync_enabled?: boolean | null
          sync_errors?: Json | null
          token_expiry?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendario_integracoes_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendario_integracoes_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      cancellation_reasons: {
        Row: {
          created_at: string | null
          dealership_id: string
          description: string
          external_id: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          description: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          description?: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "cancellation_reasons_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_standards: {
        Row: {
          created_at: string | null
          dealership_id: string
          employee_external_id: string | null
          employee_id: string | null
          external_id: string | null
          id: string
          is_active: boolean | null
          max_value: number | null
          min_value: number | null
          percent: number | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          max_value?: number | null
          min_value?: number | null
          percent?: number | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          max_value?: number | null
          min_value?: number | null
          percent?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_standards_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_standards_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          dealership_id: string
          employee_external_id: string | null
          employee_id: string | null
          external_id: string | null
          id: string
          is_paid: boolean | null
          notes: string | null
          paid_date: string | null
          percent: number | null
          sale_id: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id: string
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          paid_date?: string | null
          percent?: number | null
          sale_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id?: string
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          paid_date?: string | null
          percent?: number | null
          sale_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_asset_references: {
        Row: {
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          description: string | null
          external_id: string | null
          financing_bank: string | null
          id: string
          monthly_payment: number | null
          type: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          description?: string | null
          external_id?: string | null
          financing_bank?: string | null
          id?: string
          monthly_payment?: number | null
          type?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          description?: string | null
          external_id?: string | null
          financing_bank?: string | null
          id?: string
          monthly_payment?: number | null
          type?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_asset_references_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_asset_references_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_commercial_data: {
        Row: {
          activity: string | null
          address: string | null
          city: string | null
          cnpj: string | null
          company_name: string | null
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          id: string
          monthly_revenue: number | null
          phone: string | null
          state: string | null
        }
        Insert: {
          activity?: string | null
          address?: string | null
          city?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          id?: string
          monthly_revenue?: number | null
          phone?: string | null
          state?: string | null
        }
        Update: {
          activity?: string | null
          address?: string | null
          city?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          id?: string
          monthly_revenue?: number | null
          phone?: string | null
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_commercial_data_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_commercial_data_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_complements: {
        Row: {
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          employer: string | null
          employer_address: string | null
          employer_city: string | null
          employer_phone: string | null
          father_name: string | null
          id: string
          monthly_income: number | null
          mother_name: string | null
          profession: string | null
          spouse_cpf: string | null
          spouse_income: number | null
          spouse_name: string | null
        }
        Insert: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          employer?: string | null
          employer_address?: string | null
          employer_city?: string | null
          employer_phone?: string | null
          father_name?: string | null
          id?: string
          monthly_income?: number | null
          mother_name?: string | null
          profession?: string | null
          spouse_cpf?: string | null
          spouse_income?: number | null
          spouse_name?: string | null
        }
        Update: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          employer?: string | null
          employer_address?: string | null
          employer_city?: string | null
          employer_phone?: string | null
          father_name?: string | null
          id?: string
          monthly_income?: number | null
          mother_name?: string | null
          profession?: string | null
          spouse_cpf?: string | null
          spouse_income?: number | null
          spouse_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_complements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_complements_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_origins: {
        Row: {
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_origins_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          birth_date: string | null
          city: string | null
          cnpj: string | null
          complement: string | null
          cpf: string | null
          created_at: string | null
          dealership_id: string
          email: string | null
          external_id: string | null
          id: string
          name: string
          neighborhood: string | null
          notes: string | null
          origin_external_id: string | null
          phone: string | null
          rg: string | null
          source: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          cnpj?: string | null
          complement?: string | null
          cpf?: string | null
          created_at?: string | null
          dealership_id: string
          email?: string | null
          external_id?: string | null
          id?: string
          name: string
          neighborhood?: string | null
          notes?: string | null
          origin_external_id?: string | null
          phone?: string | null
          rg?: string | null
          source?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          city?: string | null
          cnpj?: string | null
          complement?: string | null
          cpf?: string | null
          created_at?: string | null
          dealership_id?: string
          email?: string | null
          external_id?: string | null
          id?: string
          name?: string
          neighborhood?: string | null
          notes?: string | null
          origin_external_id?: string | null
          phone?: string | null
          rg?: string | null
          source?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      dealerships: {
        Row: {
          address: string | null
          city: string | null
          cnpj: string | null
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          plan: string
          settings: Json
          slug: string
          state: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          plan?: string
          settings?: Json
          slug: string
          state?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          plan?: string
          settings?: Json
          slug?: string
          state?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      employee_salaries: {
        Row: {
          amount: number | null
          bank_account_external_id: string | null
          bank_account_id: string | null
          created_at: string | null
          date: string | null
          dealership_id: string
          description: string | null
          employee_external_id: string | null
          employee_id: string | null
          external_id: string | null
          id: string
          type: string | null
        }
        Insert: {
          amount?: number | null
          bank_account_external_id?: string | null
          bank_account_id?: string | null
          created_at?: string | null
          date?: string | null
          dealership_id: string
          description?: string | null
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          type?: string | null
        }
        Update: {
          amount?: number | null
          bank_account_external_id?: string | null
          bank_account_id?: string | null
          created_at?: string | null
          date?: string | null
          dealership_id?: string
          description?: string | null
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_salaries_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_salaries_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_salaries_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: string | null
          base_salary: number | null
          city: string | null
          commission_percent: number | null
          cpf: string | null
          created_at: string | null
          dealership_id: string
          email: string | null
          external_id: string | null
          hire_date: string | null
          id: string
          is_active: boolean | null
          name: string
          neighborhood: string | null
          notes: string | null
          phone: string | null
          rg: string | null
          role: string | null
          state: string | null
          termination_date: string | null
          updated_at: string | null
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          base_salary?: number | null
          city?: string | null
          commission_percent?: number | null
          cpf?: string | null
          created_at?: string | null
          dealership_id: string
          email?: string | null
          external_id?: string | null
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          neighborhood?: string | null
          notes?: string | null
          phone?: string | null
          rg?: string | null
          role?: string | null
          state?: string | null
          termination_date?: string | null
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          base_salary?: number | null
          city?: string | null
          commission_percent?: number | null
          cpf?: string | null
          created_at?: string | null
          dealership_id?: string
          email?: string | null
          external_id?: string | null
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          neighborhood?: string | null
          notes?: string | null
          phone?: string | null
          rg?: string | null
          role?: string | null
          state?: string | null
          termination_date?: string | null
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      executive_report_schedules: {
        Row: {
          dealership_id: string
          delivery_config: Json
          email_body: string
          email_subject: string
          enabled: boolean
          id: string
          include_attachment: boolean
          recipient_emails: string[]
          report_types: string[]
          updated_at: string | null
        }
        Insert: {
          dealership_id: string
          delivery_config?: Json
          email_body?: string
          email_subject?: string
          enabled?: boolean
          id?: string
          include_attachment?: boolean
          recipient_emails?: string[]
          report_types?: string[]
          updated_at?: string | null
        }
        Update: {
          dealership_id?: string
          delivery_config?: Json
          email_body?: string
          email_subject?: string
          enabled?: boolean
          id?: string
          include_attachment?: boolean
          recipient_emails?: string[]
          report_types?: string[]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "executive_report_schedules_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: true
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      executive_reports: {
        Row: {
          created_at: string | null
          data: Json
          dealership_id: string
          generated_at: string | null
          id: string
          period_end: string
          period_label: string
          period_start: string
          triggered_by: string
          type: string
        }
        Insert: {
          created_at?: string | null
          data?: Json
          dealership_id: string
          generated_at?: string | null
          id?: string
          period_end: string
          period_label: string
          period_start: string
          triggered_by?: string
          type: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          dealership_id?: string
          generated_at?: string | null
          id?: string
          period_end?: string
          period_label?: string
          period_start?: string
          triggered_by?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "executive_reports_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          created_by: string | null
          date: string
          dealership_id: string
          description: string | null
          external_id: string | null
          id: string
          payment_method: string | null
          receipt_url: string | null
          updated_at: string
          vehicle_id: string | null
          vendor_name: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          created_by?: string | null
          date?: string
          dealership_id: string
          description?: string | null
          external_id?: string | null
          id?: string
          payment_method?: string | null
          receipt_url?: string | null
          updated_at?: string
          vehicle_id?: string | null
          vendor_name?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          created_by?: string | null
          date?: string
          dealership_id?: string
          description?: string | null
          external_id?: string | null
          id?: string
          payment_method?: string | null
          receipt_url?: string | null
          updated_at?: string
          vehicle_id?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      financings: {
        Row: {
          bank: string | null
          contract_number: string | null
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          down_payment: number | null
          external_id: string | null
          id: string
          installment_amount: number | null
          installments: number | null
          interest_rate: number | null
          notes: string | null
          start_date: string | null
          status: string | null
          total_amount: number | null
          updated_at: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          bank?: string | null
          contract_number?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          down_payment?: number | null
          external_id?: string | null
          id?: string
          installment_amount?: number | null
          installments?: number | null
          interest_rate?: number | null
          notes?: string | null
          start_date?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          bank?: string | null
          contract_number?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          down_payment?: number | null
          external_id?: string | null
          id?: string
          installment_amount?: number | null
          installments?: number | null
          interest_rate?: number | null
          notes?: string | null
          start_date?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financings_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      fuel_types: {
        Row: {
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fuel_types_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      general_enumerations: {
        Row: {
          code: string | null
          created_at: string | null
          dealership_id: string
          description: string
          external_id: string | null
          id: string
          is_active: boolean | null
          type: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          dealership_id: string
          description: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          type: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          dealership_id?: string
          description?: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "general_enumerations_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      horarios_funcionamento: {
        Row: {
          aberto: boolean | null
          almoco_fim: string | null
          almoco_inicio: string | null
          created_at: string | null
          dealership_id: string | null
          dia_semana: number
          hora_abertura: string | null
          hora_fechamento: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          aberto?: boolean | null
          almoco_fim?: string | null
          almoco_inicio?: string | null
          created_at?: string | null
          dealership_id?: string | null
          dia_semana: number
          hora_abertura?: string | null
          hora_fechamento?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          aberto?: boolean | null
          almoco_fim?: string | null
          almoco_inicio?: string | null
          created_at?: string | null
          dealership_id?: string | null
          dia_semana?: number
          hora_abertura?: string | null
          hora_fechamento?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "horarios_funcionamento_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      imports: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          dealership_id: string
          errors: Json
          file_size: number | null
          file_type: string | null
          filename: string | null
          id: string
          records_imported: number
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          dealership_id: string
          errors?: Json
          file_size?: number | null
          file_type?: string | null
          filename?: string | null
          id?: string
          records_imported?: number
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          dealership_id?: string
          errors?: Json
          file_size?: number | null
          file_type?: string | null
          filename?: string | null
          id?: string
          records_imported?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "imports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imports_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      insurances: {
        Row: {
          coverage_type: string | null
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          end_date: string | null
          external_id: string | null
          id: string
          insured_value: number | null
          insurer: string | null
          notes: string | null
          policy_number: string | null
          premium: number | null
          start_date: string | null
          status: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          coverage_type?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          end_date?: string | null
          external_id?: string | null
          id?: string
          insured_value?: number | null
          insurer?: string | null
          notes?: string | null
          policy_number?: string | null
          premium?: number | null
          start_date?: string | null
          status?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          coverage_type?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          end_date?: string | null
          external_id?: string | null
          id?: string
          insured_value?: number | null
          insurer?: string | null
          notes?: string | null
          policy_number?: string | null
          premium?: number | null
          start_date?: string | null
          status?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurances_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurances_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurances_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurances_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_activities: {
        Row: {
          body: string | null
          created_at: string
          created_by_user_id: string | null
          dealership_id: string
          direction: string | null
          id: string
          kind: string
          lead_id: string
          metadata: Json
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by_user_id?: string | null
          dealership_id: string
          direction?: string | null
          id?: string
          kind: string
          lead_id: string
          metadata?: Json
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by_user_id?: string | null
          dealership_id?: string
          direction?: string | null
          id?: string
          kind?: string
          lead_id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_activities_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_vehicle_interest: {
        Row: {
          ai_reasoning: string | null
          ai_score: number | null
          created_at: string
          dealership_id: string
          id: string
          lead_id: string
          source: string
          vehicle_id: string
        }
        Insert: {
          ai_reasoning?: string | null
          ai_score?: number | null
          created_at?: string
          dealership_id: string
          id?: string
          lead_id: string
          source: string
          vehicle_id: string
        }
        Update: {
          ai_reasoning?: string | null
          ai_score?: number | null
          created_at?: string
          dealership_id?: string
          id?: string
          lead_id?: string
          source?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_vehicle_interest_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_vehicle_interest_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_vehicle_interest_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_vehicle_interest_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget_max_cents: number | null
          budget_min_cents: number | null
          closed_at: string | null
          cpf: string | null
          created_at: string
          customer_id: string | null
          dealership_id: string
          decision_window_days: number | null
          email: string | null
          expected_value_cents: number | null
          financing_needed: boolean | null
          id: string
          last_activity_at: string | null
          lost_reason: string | null
          name: string
          next_action_at: string | null
          notes_summary: string | null
          owner_user_id: string | null
          phone: string | null
          probability_override: number | null
          score: number
          source: string
          source_ref_id: string | null
          stage_id: string
          status: string
          temperature: string
          updated_at: string
          vehicle_interest_type: string | null
        }
        Insert: {
          budget_max_cents?: number | null
          budget_min_cents?: number | null
          closed_at?: string | null
          cpf?: string | null
          created_at?: string
          customer_id?: string | null
          dealership_id: string
          decision_window_days?: number | null
          email?: string | null
          expected_value_cents?: number | null
          financing_needed?: boolean | null
          id?: string
          last_activity_at?: string | null
          lost_reason?: string | null
          name: string
          next_action_at?: string | null
          notes_summary?: string | null
          owner_user_id?: string | null
          phone?: string | null
          probability_override?: number | null
          score?: number
          source: string
          source_ref_id?: string | null
          stage_id: string
          status?: string
          temperature?: string
          updated_at?: string
          vehicle_interest_type?: string | null
        }
        Update: {
          budget_max_cents?: number | null
          budget_min_cents?: number | null
          closed_at?: string | null
          cpf?: string | null
          created_at?: string
          customer_id?: string | null
          dealership_id?: string
          decision_window_days?: number | null
          email?: string | null
          expected_value_cents?: number | null
          financing_needed?: boolean | null
          id?: string
          last_activity_at?: string | null
          lost_reason?: string | null
          name?: string
          next_action_at?: string | null
          notes_summary?: string | null
          owner_user_id?: string | null
          phone?: string | null
          probability_override?: number | null
          score?: number
          source?: string
          source_ref_id?: string | null
          stage_id?: string
          status?: string
          temperature?: string
          updated_at?: string
          vehicle_interest_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "pipeline_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      manufacturers: {
        Row: {
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "manufacturers_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      nature_of_operation: {
        Row: {
          cfop: string | null
          created_at: string | null
          dealership_id: string
          description: string
          external_id: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          cfop?: string | null
          created_at?: string | null
          dealership_id: string
          description: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          cfop?: string | null
          created_at?: string | null
          dealership_id?: string
          description?: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "nature_of_operation_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      ncm: {
        Row: {
          code: string
          created_at: string | null
          dealership_id: string
          description: string | null
          external_id: string | null
          id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          dealership_id: string
          description?: string | null
          external_id?: string | null
          id?: string
        }
        Update: {
          code?: string
          created_at?: string | null
          dealership_id?: string
          description?: string | null
          external_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ncm_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe_dest: {
        Row: {
          address: string | null
          city: string | null
          cpf_cnpj: string | null
          created_at: string | null
          dealership_id: string
          email: string | null
          external_id: string | null
          id: string
          ie: string | null
          name: string | null
          nfe_external_id: string | null
          nfe_id: string | null
          phone: string | null
          state: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          dealership_id: string
          email?: string | null
          external_id?: string | null
          id?: string
          ie?: string | null
          name?: string | null
          nfe_external_id?: string | null
          nfe_id?: string | null
          phone?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          dealership_id?: string
          email?: string | null
          external_id?: string | null
          id?: string
          ie?: string | null
          name?: string | null
          nfe_external_id?: string | null
          nfe_id?: string | null
          phone?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_dest_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_dest_nfe_id_fkey"
            columns: ["nfe_id"]
            isOneToOne: false
            referencedRelation: "nfe_ide"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe_emit: {
        Row: {
          address: string | null
          city: string | null
          cnpj: string | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          ie: string | null
          name: string | null
          nfe_external_id: string | null
          nfe_id: string | null
          phone: string | null
          state: string | null
          trade_name: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          ie?: string | null
          name?: string | null
          nfe_external_id?: string | null
          nfe_id?: string | null
          phone?: string | null
          state?: string | null
          trade_name?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          ie?: string | null
          name?: string | null
          nfe_external_id?: string | null
          nfe_id?: string | null
          phone?: string | null
          state?: string | null
          trade_name?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_emit_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_emit_nfe_id_fkey"
            columns: ["nfe_id"]
            isOneToOne: false
            referencedRelation: "nfe_ide"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe_ide: {
        Row: {
          access_key: string | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          issue_date: string | null
          model: string | null
          nature_of_operation: string | null
          nfe_number: string | null
          operation_type: number | null
          pdf_url: string | null
          series: string | null
          status: string | null
          total_value: number | null
          vehicle_external_id: string | null
          vehicle_id: string | null
          xml_url: string | null
        }
        Insert: {
          access_key?: string | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          issue_date?: string | null
          model?: string | null
          nature_of_operation?: string | null
          nfe_number?: string | null
          operation_type?: number | null
          pdf_url?: string | null
          series?: string | null
          status?: string | null
          total_value?: number | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
          xml_url?: string | null
        }
        Update: {
          access_key?: string | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          issue_date?: string | null
          model?: string | null
          nature_of_operation?: string | null
          nfe_number?: string | null
          operation_type?: number | null
          pdf_url?: string | null
          series?: string | null
          status?: string | null
          total_value?: number | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
          xml_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_ide_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_ide_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_ide_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe_prod: {
        Row: {
          cfop: string | null
          created_at: string | null
          dealership_id: string
          description: string | null
          ean: string | null
          external_id: string | null
          id: string
          ncm_code: string | null
          nfe_external_id: string | null
          nfe_id: string | null
          product_code: string | null
          quantity: number | null
          total_value: number | null
          unit: string | null
          unit_value: number | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          cfop?: string | null
          created_at?: string | null
          dealership_id: string
          description?: string | null
          ean?: string | null
          external_id?: string | null
          id?: string
          ncm_code?: string | null
          nfe_external_id?: string | null
          nfe_id?: string | null
          product_code?: string | null
          quantity?: number | null
          total_value?: number | null
          unit?: string | null
          unit_value?: number | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          cfop?: string | null
          created_at?: string | null
          dealership_id?: string
          description?: string | null
          ean?: string | null
          external_id?: string | null
          id?: string
          ncm_code?: string | null
          nfe_external_id?: string | null
          nfe_id?: string | null
          product_code?: string | null
          quantity?: number | null
          total_value?: number | null
          unit?: string | null
          unit_value?: number | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_prod_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_prod_nfe_id_fkey"
            columns: ["nfe_id"]
            isOneToOne: false
            referencedRelation: "nfe_ide"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_prod_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_prod_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      optionals: {
        Row: {
          category: string | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "optionals_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      order_followups: {
        Row: {
          created_at: string | null
          date: string | null
          dealership_id: string
          description: string | null
          employee_external_id: string | null
          employee_id: string | null
          external_id: string | null
          id: string
          next_contact: string | null
          order_external_id: string | null
          order_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          dealership_id: string
          description?: string | null
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          next_contact?: string | null
          order_external_id?: string | null
          order_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          dealership_id?: string
          description?: string | null
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          next_contact?: string | null
          order_external_id?: string | null
          order_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_followups_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_followups_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_followups_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number | null
          cancellation_reason_id: string | null
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          down_payment: number | null
          employee_external_id: string | null
          employee_id: string | null
          external_id: string | null
          id: string
          notes: string | null
          order_date: string | null
          payment_method: string | null
          status: string | null
          updated_at: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          amount?: number | null
          cancellation_reason_id?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          down_payment?: number | null
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          notes?: string | null
          order_date?: string | null
          payment_method?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          amount?: number | null
          cancellation_reason_id?: string | null
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          down_payment?: number | null
          employee_external_id?: string | null
          employee_id?: string | null
          external_id?: string | null
          id?: string
          notes?: string | null
          order_date?: string | null
          payment_method?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_cancellation_reason_id_fkey"
            columns: ["cancellation_reason_id"]
            isOneToOne: false
            referencedRelation: "cancellation_reasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_stages: {
        Row: {
          color: string
          created_at: string
          dealership_id: string
          default_probability: number
          id: string
          is_terminal_lost: boolean
          is_terminal_won: boolean
          name: string
          pipeline_id: string
          position: number
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          dealership_id: string
          default_probability?: number
          id?: string
          is_terminal_lost?: boolean
          is_terminal_won?: boolean
          name: string
          pipeline_id: string
          position?: number
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          dealership_id?: string
          default_probability?: number
          id?: string
          is_terminal_lost?: boolean
          is_terminal_won?: boolean
          name?: string
          pipeline_id?: string
          position?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_stages_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_stages_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
        ]
      }
      pipelines: {
        Row: {
          created_at: string
          dealership_id: string
          id: string
          is_default: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dealership_id: string
          id?: string
          is_default?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dealership_id?: string
          id?: string
          is_default?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipelines_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_accounts: {
        Row: {
          category: string | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          name: string
          parent_id: string | null
          type: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          name: string
          parent_id?: string | null
          type?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_accounts_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_accounts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "plan_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_sale_expenses: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          dealership_id: string
          description: string | null
          external_id: string | null
          id: string
          plan_account_external_id: string | null
          plan_account_id: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id: string
          description?: string | null
          external_id?: string | null
          id?: string
          plan_account_external_id?: string | null
          plan_account_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id?: string
          description?: string | null
          external_id?: string | null
          id?: string
          plan_account_external_id?: string | null
          plan_account_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_sale_expenses_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_sale_expenses_plan_account_id_fkey"
            columns: ["plan_account_id"]
            isOneToOne: false
            referencedRelation: "plan_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_sale_expenses_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_sale_expenses_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_data: {
        Row: {
          created_at: string | null
          dealership_id: string
          id: string
          mileage: number | null
          notes: string | null
          payment_method: string | null
          purchase_date: string | null
          purchase_price: number | null
          seller_customer_external_id: string | null
          seller_customer_id: string | null
          supplier_external_id: string | null
          supplier_id: string | null
          supplier_name: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          id?: string
          mileage?: number | null
          notes?: string | null
          payment_method?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          seller_customer_external_id?: string | null
          seller_customer_id?: string | null
          supplier_external_id?: string | null
          supplier_id?: string | null
          supplier_name?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          id?: string
          mileage?: number | null
          notes?: string | null
          payment_method?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          seller_customer_external_id?: string | null
          seller_customer_id?: string | null
          supplier_external_id?: string | null
          supplier_id?: string | null
          supplier_name?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_data_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_data_seller_customer_id_fkey"
            columns: ["seller_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_data_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_data_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_data_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      relatorios_agendados: {
        Row: {
          ativo: boolean
          created_at: string
          dealership_id: string
          destinatarios: string[]
          dia_mes: number | null
          dia_semana: number | null
          frequencia: string
          hora: string
          id: string
          name: string
          periodo_dias: number
          tipo: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          dealership_id: string
          destinatarios?: string[]
          dia_mes?: number | null
          dia_semana?: number | null
          frequencia: string
          hora?: string
          id?: string
          name: string
          periodo_dias?: number
          tipo: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          dealership_id?: string
          destinatarios?: string[]
          dia_mes?: number | null
          dia_semana?: number | null
          frequencia?: string
          hora?: string
          id?: string
          name?: string
          periodo_dias?: number
          tipo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "relatorios_agendados_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      relatorios_enviados_log: {
        Row: {
          dealership_id: string
          destinatarios: string[]
          enviado_em: string
          erro: string | null
          id: string
          relatorio_id: string
          resend_id: string | null
          status: string
        }
        Insert: {
          dealership_id: string
          destinatarios?: string[]
          enviado_em?: string
          erro?: string | null
          id?: string
          relatorio_id: string
          resend_id?: string | null
          status?: string
        }
        Update: {
          dealership_id?: string
          destinatarios?: string[]
          enviado_em?: string
          erro?: string | null
          id?: string
          relatorio_id?: string
          resend_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "relatorios_enviados_log_relatorio_id_fkey"
            columns: ["relatorio_id"]
            isOneToOne: false
            referencedRelation: "relatorios_agendados"
            referencedColumns: ["id"]
          },
        ]
      }
      repurchase_cadences: {
        Row: {
          created_at: string
          customer_id: string | null
          dealership_id: string
          id: string
          next_touch_at: string
          sale_id: string
          status: string
          step: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          dealership_id: string
          id?: string
          next_touch_at: string
          sale_id: string
          status?: string
          step?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          dealership_id?: string
          id?: string
          next_touch_at?: string
          sale_id?: string
          status?: string
          step?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "repurchase_cadences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repurchase_cadences_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repurchase_cadences_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_data: {
        Row: {
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          employee_external_id: string | null
          employee_id: string | null
          id: string
          mileage: number | null
          notes: string | null
          payment_method: string | null
          sale_date: string | null
          sale_price: number | null
          sale_record_id: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          employee_external_id?: string | null
          employee_id?: string | null
          id?: string
          mileage?: number | null
          notes?: string | null
          payment_method?: string | null
          sale_date?: string | null
          sale_price?: number | null
          sale_record_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          employee_external_id?: string | null
          employee_id?: string | null
          id?: string
          mileage?: number | null
          notes?: string | null
          payment_method?: string | null
          sale_date?: string | null
          sale_price?: number | null
          sale_record_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_data_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_data_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_data_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_data_sale_record_id_fkey"
            columns: ["sale_record_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_data_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_data_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          created_at: string
          customer_cpf: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          dealership_id: string
          down_payment: number | null
          external_id: string | null
          financing_bank: string | null
          id: string
          lead_id: string | null
          notes: string | null
          payment_method: string
          profit: number | null
          profit_percent: number | null
          purchase_price: number
          sale_date: string
          sale_price: number
          salesperson_id: string | null
          salesperson_name: string | null
          total_expenses: number
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          customer_cpf?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          dealership_id: string
          down_payment?: number | null
          external_id?: string | null
          financing_bank?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          payment_method: string
          profit?: number | null
          profit_percent?: number | null
          purchase_price: number
          sale_date?: string
          sale_price: number
          salesperson_id?: string | null
          salesperson_name?: string | null
          total_expenses?: number
          vehicle_id: string
        }
        Update: {
          created_at?: string
          customer_cpf?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          dealership_id?: string
          down_payment?: number | null
          external_id?: string | null
          financing_bank?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          payment_method?: string
          profit?: number | null
          profit_percent?: number | null
          purchase_price?: number
          sale_date?: string
          sale_price?: number
          salesperson_id?: string | null
          salesperson_name?: string | null
          total_expenses?: number
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_salesperson_id_fkey"
            columns: ["salesperson_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      sequence_enrollments: {
        Row: {
          created_at: string
          current_step: number
          dealership_id: string
          id: string
          lead_id: string
          next_run_at: string | null
          sequence_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_step?: number
          dealership_id: string
          id?: string
          lead_id: string
          next_run_at?: string | null
          sequence_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_step?: number
          dealership_id?: string
          id?: string
          lead_id?: string
          next_run_at?: string | null
          sequence_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sequence_enrollments_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_enrollments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_enrollments_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      sequence_steps: {
        Row: {
          channel: string
          created_at: string
          dealership_id: string
          delay_hours: number
          id: string
          position: number
          sequence_id: string
          template: Json
        }
        Insert: {
          channel: string
          created_at?: string
          dealership_id: string
          delay_hours?: number
          id?: string
          position?: number
          sequence_id: string
          template?: Json
        }
        Update: {
          channel?: string
          created_at?: string
          dealership_id?: string
          delay_hours?: number
          id?: string
          position?: number
          sequence_id?: string
          template?: Json
        }
        Relationships: [
          {
            foreignKeyName: "sequence_steps_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      sequences: {
        Row: {
          channel: string
          created_at: string
          dealership_id: string
          id: string
          is_active: boolean
          name: string
          trigger: Json
          updated_at: string
        }
        Insert: {
          channel: string
          created_at?: string
          dealership_id: string
          id?: string
          is_active?: boolean
          name: string
          trigger?: Json
          updated_at?: string
        }
        Update: {
          channel?: string
          created_at?: string
          dealership_id?: string
          id?: string
          is_active?: boolean
          name?: string
          trigger?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sequences_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      slots_bloqueados: {
        Row: {
          created_at: string | null
          created_by: string | null
          data_fim: string
          data_inicio: string
          dealership_id: string | null
          employee_id: string | null
          id: string
          motivo: string | null
          recorrencia_regra: Json | null
          recorrente: boolean | null
          tipo: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data_fim: string
          data_inicio: string
          dealership_id?: string | null
          employee_id?: string | null
          id?: string
          motivo?: string | null
          recorrencia_regra?: Json | null
          recorrente?: boolean | null
          tipo?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data_fim?: string
          data_inicio?: string
          dealership_id?: string | null
          employee_id?: string | null
          id?: string
          motivo?: string | null
          recorrencia_regra?: Json | null
          recorrente?: boolean | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slots_bloqueados_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slots_bloqueados_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slots_bloqueados_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      standard_expenses: {
        Row: {
          amount: number | null
          created_at: string | null
          dealership_id: string
          description: string
          external_id: string | null
          id: string
          is_active: boolean | null
          plan_account_external_id: string | null
          plan_account_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          dealership_id: string
          description: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          plan_account_external_id?: string | null
          plan_account_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          dealership_id?: string
          description?: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          plan_account_external_id?: string | null
          plan_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "standard_expenses_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standard_expenses_plan_account_id_fkey"
            columns: ["plan_account_id"]
            isOneToOne: false
            referencedRelation: "plan_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      standard_pendencies: {
        Row: {
          category: string | null
          created_at: string | null
          dealership_id: string
          description: string
          external_id: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          dealership_id: string
          description: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          dealership_id?: string
          description?: string
          external_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "standard_pendencies_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      text_configurations: {
        Row: {
          content: string | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          key: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          key: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          key?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "text_configurations_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          dealership_id: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: string
          settings: Json
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          dealership_id?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role?: string
          settings?: Json
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          dealership_id?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: string
          settings?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_apportionment: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          dealership_id: string
          description: string | null
          external_id: string | null
          id: string
          plan_account_external_id: string | null
          plan_account_id: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id: string
          description?: string | null
          external_id?: string | null
          id?: string
          plan_account_external_id?: string | null
          plan_account_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id?: string
          description?: string | null
          external_id?: string | null
          id?: string
          plan_account_external_id?: string | null
          plan_account_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_apportionment_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_apportionment_plan_account_id_fkey"
            columns: ["plan_account_id"]
            isOneToOne: false
            referencedRelation: "plan_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_apportionment_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_apportionment_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_delivery_protocols: {
        Row: {
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          delivery_date: string | null
          description: string | null
          external_id: string | null
          fuel_level: string | null
          id: string
          mileage: number | null
          notes: string | null
          signature_url: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          delivery_date?: string | null
          description?: string | null
          external_id?: string | null
          fuel_level?: string | null
          id?: string
          mileage?: number | null
          notes?: string | null
          signature_url?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          delivery_date?: string | null
          description?: string | null
          external_id?: string | null
          fuel_level?: string | null
          id?: string
          mileage?: number | null
          notes?: string | null
          signature_url?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_delivery_protocols_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_delivery_protocols_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_delivery_protocols_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_delivery_protocols_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_documents: {
        Row: {
          created_at: string | null
          dealership_id: string
          expiry_date: string | null
          external_id: string | null
          file_url: string | null
          id: string
          issue_date: string | null
          notes: string | null
          number: string | null
          type: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          expiry_date?: string | null
          external_id?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          number?: string | null
          type?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          expiry_date?: string | null
          external_id?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          number?: string | null
          type?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_documents_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_fines: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          dealership_id: string
          description: string | null
          external_id: string | null
          id: string
          infraction_code: string | null
          is_paid: boolean | null
          issuing_agency: string | null
          notes: string | null
          paid_date: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id: string
          description?: string | null
          external_id?: string | null
          id?: string
          infraction_code?: string | null
          is_paid?: boolean | null
          issuing_agency?: string | null
          notes?: string | null
          paid_date?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id?: string
          description?: string | null
          external_id?: string | null
          id?: string
          infraction_code?: string | null
          is_paid?: boolean | null
          issuing_agency?: string | null
          notes?: string | null
          paid_date?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_fines_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_fines_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_fines_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_optionals: {
        Row: {
          created_at: string | null
          dealership_id: string
          external_id: string | null
          id: string
          name: string | null
          optional_external_id: string | null
          optional_id: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          id?: string
          name?: string | null
          optional_external_id?: string | null
          optional_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          id?: string
          name?: string | null
          optional_external_id?: string | null
          optional_id?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_optionals_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_optionals_optional_id_fkey"
            columns: ["optional_id"]
            isOneToOne: false
            referencedRelation: "optionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_optionals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_optionals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_pendencies: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          dealership_id: string
          description: string | null
          external_id: string | null
          id: string
          notes: string | null
          resolved_date: string | null
          standard_pendency_external_id: string | null
          standard_pendency_id: string | null
          status: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id: string
          description?: string | null
          external_id?: string | null
          id?: string
          notes?: string | null
          resolved_date?: string | null
          standard_pendency_external_id?: string | null
          standard_pendency_id?: string | null
          status?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          dealership_id?: string
          description?: string | null
          external_id?: string | null
          id?: string
          notes?: string | null
          resolved_date?: string | null
          standard_pendency_external_id?: string | null
          standard_pendency_id?: string | null
          status?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_pendencies_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_pendencies_standard_pendency_id_fkey"
            columns: ["standard_pendency_id"]
            isOneToOne: false
            referencedRelation: "standard_pendencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_pendencies_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_pendencies_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_purchase_documents: {
        Row: {
          amount: number | null
          created_at: string | null
          dealership_id: string
          external_id: string | null
          file_url: string | null
          id: string
          issue_date: string | null
          notes: string | null
          number: string | null
          type: string | null
          vehicle_external_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          dealership_id: string
          external_id?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          number?: string | null
          type?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          dealership_id?: string
          external_id?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          number?: string | null
          type?: string | null
          vehicle_external_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_purchase_documents_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_purchase_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_purchase_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_trades: {
        Row: {
          created_at: string | null
          customer_external_id: string | null
          customer_id: string | null
          dealership_id: string
          difference_amount: number | null
          external_id: string | null
          id: string
          incoming_vehicle_external_id: string | null
          incoming_vehicle_id: string | null
          notes: string | null
          outgoing_vehicle_external_id: string | null
          outgoing_vehicle_id: string | null
          trade_date: string | null
          trade_in_value: number | null
        }
        Insert: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id: string
          difference_amount?: number | null
          external_id?: string | null
          id?: string
          incoming_vehicle_external_id?: string | null
          incoming_vehicle_id?: string | null
          notes?: string | null
          outgoing_vehicle_external_id?: string | null
          outgoing_vehicle_id?: string | null
          trade_date?: string | null
          trade_in_value?: number | null
        }
        Update: {
          created_at?: string | null
          customer_external_id?: string | null
          customer_id?: string | null
          dealership_id?: string
          difference_amount?: number | null
          external_id?: string | null
          id?: string
          incoming_vehicle_external_id?: string | null
          incoming_vehicle_id?: string | null
          notes?: string | null
          outgoing_vehicle_external_id?: string | null
          outgoing_vehicle_id?: string | null
          trade_date?: string | null
          trade_in_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_trades_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_trades_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_trades_incoming_vehicle_id_fkey"
            columns: ["incoming_vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_trades_incoming_vehicle_id_fkey"
            columns: ["incoming_vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_trades_outgoing_vehicle_id_fkey"
            columns: ["outgoing_vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_trades_outgoing_vehicle_id_fkey"
            columns: ["outgoing_vehicle_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          brand: string
          chassis: string | null
          color: string | null
          created_at: string
          customer_id: string | null
          days_in_stock: number
          dealership_id: string
          external_id: string | null
          fipe_price: number | null
          fuel: string | null
          id: string
          mileage: number
          min_price: number | null
          model: string
          notes: string | null
          photos: string[]
          plate: string | null
          purchase_date: string
          purchase_price: number
          renavam: string | null
          sale_date: string | null
          sale_price: number | null
          source: string | null
          status: string
          supplier_name: string | null
          transmission: string | null
          updated_at: string
          version: string | null
          year_fab: number
          year_model: number
        }
        Insert: {
          brand: string
          chassis?: string | null
          color?: string | null
          created_at?: string
          customer_id?: string | null
          days_in_stock?: number
          dealership_id: string
          external_id?: string | null
          fipe_price?: number | null
          fuel?: string | null
          id?: string
          mileage?: number
          min_price?: number | null
          model: string
          notes?: string | null
          photos?: string[]
          plate?: string | null
          purchase_date?: string
          purchase_price?: number
          renavam?: string | null
          sale_date?: string | null
          sale_price?: number | null
          source?: string | null
          status?: string
          supplier_name?: string | null
          transmission?: string | null
          updated_at?: string
          version?: string | null
          year_fab: number
          year_model: number
        }
        Update: {
          brand?: string
          chassis?: string | null
          color?: string | null
          created_at?: string
          customer_id?: string | null
          days_in_stock?: number
          dealership_id?: string
          external_id?: string | null
          fipe_price?: number | null
          fuel?: string | null
          id?: string
          mileage?: number
          min_price?: number | null
          model?: string
          notes?: string | null
          photos?: string[]
          plate?: string | null
          purchase_date?: string
          purchase_price?: number
          renavam?: string | null
          sale_date?: string | null
          sale_price?: number | null
          source?: string | null
          status?: string
          supplier_name?: string | null
          transmission?: string | null
          updated_at?: string
          version?: string | null
          year_fab?: number
          year_model?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          category: string | null
          city: string | null
          cnpj: string | null
          created_at: string | null
          dealership_id: string
          email: string | null
          external_id: string | null
          id: string
          name: string
          neighborhood: string | null
          notes: string | null
          phone: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          category?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          dealership_id: string
          email?: string | null
          external_id?: string | null
          id?: string
          name: string
          neighborhood?: string | null
          notes?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          category?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          dealership_id?: string
          email?: string | null
          external_id?: string | null
          id?: string
          name?: string
          neighborhood?: string | null
          notes?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_conversas: {
        Row: {
          atualizado_em: string
          contexto_resumo: string | null
          criado_em: string
          dealership_id: string
          id: string
          nome_contato: string | null
          remote_jid: string | null
          status: string
          telefone: string
          telefone_limpo: string
          total_mensagens: number
          ultima_intencao: string | null
          ultima_mensagem_em: string | null
          veiculo_interesse_id: string | null
        }
        Insert: {
          atualizado_em?: string
          contexto_resumo?: string | null
          criado_em?: string
          dealership_id: string
          id?: string
          nome_contato?: string | null
          remote_jid?: string | null
          status?: string
          telefone: string
          telefone_limpo: string
          total_mensagens?: number
          ultima_intencao?: string | null
          ultima_mensagem_em?: string | null
          veiculo_interesse_id?: string | null
        }
        Update: {
          atualizado_em?: string
          contexto_resumo?: string | null
          criado_em?: string
          dealership_id?: string
          id?: string
          nome_contato?: string | null
          remote_jid?: string | null
          status?: string
          telefone?: string
          telefone_limpo?: string
          total_mensagens?: number
          ultima_intencao?: string | null
          ultima_mensagem_em?: string | null
          veiculo_interesse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_conversas_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_conversas_veiculo_interesse_id_fkey"
            columns: ["veiculo_interesse_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_conversas_veiculo_interesse_id_fkey"
            columns: ["veiculo_interesse_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_movimentacao"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_mensagens: {
        Row: {
          conteudo: string
          conversa_id: string
          criado_em: string
          dealership_id: string
          direcao: string
          entregue_em: string | null
          enviado_em: string | null
          erro: string | null
          id: string
          lido_em: string | null
          midia_tipo: string | null
          midia_url: string | null
          modelo_usado: string | null
          processado_por_ia: boolean
          status: string
          tempo_resposta_ms: number | null
          tipo: string
          tokens_entrada: number | null
          tokens_saida: number | null
          wasender_msg_id: string | null
        }
        Insert: {
          conteudo: string
          conversa_id: string
          criado_em?: string
          dealership_id: string
          direcao: string
          entregue_em?: string | null
          enviado_em?: string | null
          erro?: string | null
          id?: string
          lido_em?: string | null
          midia_tipo?: string | null
          midia_url?: string | null
          modelo_usado?: string | null
          processado_por_ia?: boolean
          status?: string
          tempo_resposta_ms?: number | null
          tipo?: string
          tokens_entrada?: number | null
          tokens_saida?: number | null
          wasender_msg_id?: string | null
        }
        Update: {
          conteudo?: string
          conversa_id?: string
          criado_em?: string
          dealership_id?: string
          direcao?: string
          entregue_em?: string | null
          enviado_em?: string | null
          erro?: string | null
          id?: string
          lido_em?: string | null
          midia_tipo?: string | null
          midia_url?: string | null
          modelo_usado?: string | null
          processado_por_ia?: boolean
          status?: string
          tempo_resposta_ms?: number | null
          tipo?: string
          tokens_entrada?: number | null
          tokens_saida?: number | null
          wasender_msg_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_mensagens_conversa_id_fkey"
            columns: ["conversa_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_conversas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_mensagens_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_prompts: {
        Row: {
          ativo: boolean
          created_at: string
          dealership_id: string
          id: string
          nome: string
          prompt: string
          tipo: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          dealership_id: string
          id?: string
          nome: string
          prompt: string
          tipo: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          dealership_id?: string
          id?: string
          nome?: string
          prompt?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_prompts_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_sessoes: {
        Row: {
          ai_ativo: boolean
          created_at: string
          dealership_id: string
          horario_atendimento_fim: string | null
          horario_atendimento_inicio: string | null
          id: string
          mensagem_fora_horario: string | null
          modelo_padrao: string
          nome: string | null
          prompt_sistema: string | null
          status: string
          telefone: string | null
          ultimo_status_check: string | null
          updated_at: string
          wasender_api_key: string
          wasender_session_id: string
        }
        Insert: {
          ai_ativo?: boolean
          created_at?: string
          dealership_id: string
          horario_atendimento_fim?: string | null
          horario_atendimento_inicio?: string | null
          id?: string
          mensagem_fora_horario?: string | null
          modelo_padrao?: string
          nome?: string | null
          prompt_sistema?: string | null
          status?: string
          telefone?: string | null
          ultimo_status_check?: string | null
          updated_at?: string
          wasender_api_key: string
          wasender_session_id: string
        }
        Update: {
          ai_ativo?: boolean
          created_at?: string
          dealership_id?: string
          horario_atendimento_fim?: string | null
          horario_atendimento_inicio?: string | null
          id?: string
          mensagem_fora_horario?: string | null
          modelo_padrao?: string
          nome?: string | null
          prompt_sistema?: string | null
          status?: string
          telefone?: string | null
          ultimo_status_check?: string | null
          updated_at?: string
          wasender_api_key?: string
          wasender_session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_sessoes_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: true
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
      widget_conversas: {
        Row: {
          agendamento_id: string | null
          convertido: boolean | null
          created_at: string | null
          dados_qualificacao: Json | null
          dealership_id: string | null
          dispositivo: string | null
          ended_at: string | null
          id: string
          lead_email: string | null
          lead_nome: string | null
          lead_telefone: string | null
          mensagens: Json | null
          pagina_origem: string | null
          qualificado: boolean | null
          started_at: string | null
          temperatura: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string | null
        }
        Insert: {
          agendamento_id?: string | null
          convertido?: boolean | null
          created_at?: string | null
          dados_qualificacao?: Json | null
          dealership_id?: string | null
          dispositivo?: string | null
          ended_at?: string | null
          id?: string
          lead_email?: string | null
          lead_nome?: string | null
          lead_telefone?: string | null
          mensagens?: Json | null
          pagina_origem?: string | null
          qualificado?: boolean | null
          started_at?: string | null
          temperatura?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Update: {
          agendamento_id?: string | null
          convertido?: boolean | null
          created_at?: string | null
          dados_qualificacao?: Json | null
          dealership_id?: string | null
          dispositivo?: string | null
          ended_at?: string | null
          id?: string
          lead_email?: string | null
          lead_nome?: string | null
          lead_telefone?: string | null
          mensagens?: Json | null
          pagina_origem?: string | null
          qualificado?: boolean | null
          started_at?: string | null
          temperatura?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "widget_conversas_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: false
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "widget_conversas_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      visao_geral_movimentacao: {
        Row: {
          brand: string | null
          car_id: string | null
          color: string | null
          days_in_stock: number | null
          dealership_id: string | null
          fipe_price: number | null
          fuel: string | null
          gross_profit: number | null
          id: string | null
          mileage: number | null
          model: string | null
          plate: string | null
          profit_percent: number | null
          purchase_date: string | null
          purchase_price: number | null
          sale_date: string | null
          sale_price: number | null
          source: string | null
          status: string | null
          total_expenses: number | null
          version: string | null
          year_fab: number | null
          year_model: number | null
        }
        Insert: {
          brand?: string | null
          car_id?: string | null
          color?: string | null
          days_in_stock?: never
          dealership_id?: string | null
          fipe_price?: number | null
          fuel?: string | null
          gross_profit?: never
          id?: string | null
          mileage?: number | null
          model?: string | null
          plate?: string | null
          profit_percent?: never
          purchase_date?: string | null
          purchase_price?: number | null
          sale_date?: string | null
          sale_price?: number | null
          source?: string | null
          status?: string | null
          total_expenses?: never
          version?: string | null
          year_fab?: number | null
          year_model?: number | null
        }
        Update: {
          brand?: string | null
          car_id?: string | null
          color?: string | null
          days_in_stock?: never
          dealership_id?: string | null
          fipe_price?: number | null
          fuel?: string | null
          gross_profit?: never
          id?: string | null
          mileage?: number | null
          model?: string | null
          plate?: string | null
          profit_percent?: never
          purchase_date?: string | null
          purchase_price?: number | null
          sale_date?: string | null
          sale_price?: number | null
          source?: string | null
          status?: string | null
          total_expenses?: never
          version?: string | null
          year_fab?: number | null
          year_model?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_dealership_id_fkey"
            columns: ["dealership_id"]
            isOneToOne: false
            referencedRelation: "dealerships"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_slot_disponivel: {
        Args: {
          p_data_fim: string
          p_data_inicio: string
          p_dealership_id: string
          p_salesperson_id: string
        }
        Returns: boolean
      }
      criar_agendamento: {
        Args: {
          p_conversa_id?: string
          p_dados_qualificacao?: Json
          p_data_fim: string
          p_data_inicio: string
          p_dealership_id: string
          p_lead_email?: string
          p_lead_nome: string
          p_lead_telefone: string
          p_origem?: string
          p_salesperson_id?: string
          p_tipo?: string
          p_vehicle_id?: string
          p_veiculo_interesse?: string
        }
        Returns: Json
      }
      get_calendario_dashboard: {
        Args: {
          p_data_fim: string
          p_data_inicio: string
          p_dealership_id: string
          p_salesperson_id?: string
        }
        Returns: {
          cor: string
          data_fim: string
          data_inicio: string
          id: string
          lead_nome: string
          lead_telefone: string
          origem: string
          salesperson_id: string
          salesperson_name: string
          status: string
          tipo: string
          veiculo_interesse: string
        }[]
      }
      get_dashboard_stats: { Args: { d_id: string }; Returns: Json }
      get_slots_disponiveis: {
        Args: {
          p_data_fim: string
          p_data_inicio: string
          p_dealership_id: string
          p_salesperson_id?: string
        }
        Returns: {
          data: string
          dia_nome: string
          dia_semana: number
          disponivel: boolean
          horario: string
          horario_fim: string
          salespersons_disponiveis: string[]
        }[]
      }
      my_dealership_id: { Args: never; Returns: string }
      seed_default_pipeline: {
        Args: { p_dealership_id: string }
        Returns: undefined
      }
      seed_horarios_funcionamento: {
        Args: { p_dealership_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
