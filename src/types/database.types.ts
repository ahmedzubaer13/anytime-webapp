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
      app_config: {
        Row: {
          created_at: string
          environment: string
          id: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          environment?: string
          id?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          environment?: string
          id?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      availability_slots: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          starts_at: string
          status: Database["public"]["Enums"]["slot_status"]
          teacher_id: string
          timezone: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          starts_at: string
          status?: Database["public"]["Enums"]["slot_status"]
          teacher_id: string
          timezone?: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["slot_status"]
          teacher_id?: string
          timezone?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_slots_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      bookings: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          amount: number
          availability_id: string | null
          created_at: string
          duration_minutes: number
          id: string
          livekit_room: string | null
          rate_per_minute: number
          scheduled_end: string
          scheduled_start: string
          status: Database["public"]["Enums"]["booking_status"]
          student_id: string
          teacher_id: string
          type: Database["public"]["Enums"]["booking_type"]
          updated_at: string
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          amount?: number
          availability_id?: string | null
          created_at?: string
          duration_minutes: number
          id?: string
          livekit_room?: string | null
          rate_per_minute?: number
          scheduled_end: string
          scheduled_start: string
          status?: Database["public"]["Enums"]["booking_status"]
          student_id: string
          teacher_id: string
          type: Database["public"]["Enums"]["booking_type"]
          updated_at?: string
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          amount?: number
          availability_id?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          livekit_room?: string | null
          rate_per_minute?: number
          scheduled_end?: string
          scheduled_start?: string
          status?: Database["public"]["Enums"]["booking_status"]
          student_id?: string
          teacher_id?: string
          type?: Database["public"]["Enums"]["booking_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_availability_id_fkey"
            columns: ["availability_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          data: Json
          id: string
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          data?: Json
          id?: string
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          data?: Json
          id?: string
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          full_name: string
          id: string
          language: string
          role: Database["public"]["Enums"]["user_role"]
          timezone: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          full_name?: string
          id: string
          language?: string
          role?: Database["public"]["Enums"]["user_role"]
          timezone?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          full_name?: string
          id?: string
          language?: string
          role?: Database["public"]["Enums"]["user_role"]
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string
          created_at: string
          id: string
          rating: number
          student_id: string
          teacher_id: string
        }
        Insert: {
          booking_id: string
          comment?: string
          created_at?: string
          id?: string
          rating: number
          student_id: string
          teacher_id: string
        }
        Update: {
          booking_id?: string
          comment?: string
          created_at?: string
          id?: string
          rating?: number
          student_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      subjects: {
        Row: {
          category: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          category?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          category?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      teacher_profiles: {
        Row: {
          accepting_students: boolean
          biography: string
          created_at: string
          experience_years: number
          headline: string
          is_verified: boolean
          languages: string[]
          presence: Database["public"]["Enums"]["presence_status"]
          rate_per_hour: number
          rate_per_minute: number
          rating: number
          response_time_minutes: number
          review_count: number
          sessions_completed: number
          tags: string[]
          trial_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          accepting_students?: boolean
          biography?: string
          created_at?: string
          experience_years?: number
          headline?: string
          is_verified?: boolean
          languages?: string[]
          presence?: Database["public"]["Enums"]["presence_status"]
          rate_per_hour?: number
          rate_per_minute?: number
          rating?: number
          response_time_minutes?: number
          review_count?: number
          sessions_completed?: number
          tags?: string[]
          trial_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          accepting_students?: boolean
          biography?: string
          created_at?: string
          experience_years?: number
          headline?: string
          is_verified?: boolean
          languages?: string[]
          presence?: Database["public"]["Enums"]["presence_status"]
          rate_per_hour?: number
          rate_per_minute?: number
          rating?: number
          response_time_minutes?: number
          review_count?: number
          sessions_completed?: number
          tags?: string[]
          trial_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_subjects: {
        Row: {
          subject_id: string
          teacher_id: string
        }
        Insert: {
          subject_id: string
          teacher_id: string
        }
        Update: {
          subject_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          booking_id: string | null
          created_at: string
          description: string
          id: string
          idempotency_key: string | null
          stripe_payment_intent_id: string | null
          type: Database["public"]["Enums"]["txn_type"]
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          booking_id?: string | null
          created_at?: string
          description?: string
          id?: string
          idempotency_key?: string | null
          stripe_payment_intent_id?: string | null
          type: Database["public"]["Enums"]["txn_type"]
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          booking_id?: string | null
          created_at?: string
          description?: string
          id?: string
          idempotency_key?: string | null
          stripe_payment_intent_id?: string | null
          type?: Database["public"]["Enums"]["txn_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_booking: {
        Args: { p_booking_id: string }
        Returns: {
          actual_end: string | null
          actual_start: string | null
          amount: number
          availability_id: string | null
          created_at: string
          duration_minutes: number
          id: string
          livekit_room: string | null
          rate_per_minute: number
          scheduled_end: string
          scheduled_start: string
          status: Database["public"]["Enums"]["booking_status"]
          student_id: string
          teacher_id: string
          type: Database["public"]["Enums"]["booking_type"]
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "bookings"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_booking: {
        Args: {
          p_availability_id: string
          p_duration_minutes: number
          p_teacher_id: string
          p_type: Database["public"]["Enums"]["booking_type"]
        }
        Returns: {
          actual_end: string | null
          actual_start: string | null
          amount: number
          availability_id: string | null
          created_at: string
          duration_minutes: number
          id: string
          livekit_room: string | null
          rate_per_minute: number
          scheduled_end: string
          scheduled_start: string
          status: Database["public"]["Enums"]["booking_status"]
          student_id: string
          teacher_id: string
          type: Database["public"]["Enums"]["booking_type"]
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "bookings"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      dev_recharge_wallet: {
        Args: { p_amount: number }
        Returns: {
          balance: number
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "wallets"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      is_dev_environment: { Args: never; Returns: boolean }
    }
    Enums: {
      booking_status:
        | "pending"
        | "confirmed"
        | "active"
        | "completed"
        | "cancelled"
        | "refunded"
        | "no_show"
        | "disputed"
      booking_type: "trial" | "paid" | "instant"
      notification_type:
        | "booking_request"
        | "booking_confirmed"
        | "booking_cancelled"
        | "session_starting"
        | "message_received"
        | "review_received"
        | "payment_completed"
      presence_status: "offline" | "available" | "busy"
      slot_status: "open" | "booked" | "cancelled"
      txn_type:
        | "deposit"
        | "session_charge"
        | "teacher_earning"
        | "platform_fee"
        | "refund"
        | "withdrawal"
        | "adjustment"
      user_role: "student" | "teacher" | "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "pending",
        "confirmed",
        "active",
        "completed",
        "cancelled",
        "refunded",
        "no_show",
        "disputed",
      ],
      booking_type: ["trial", "paid", "instant"],
      notification_type: [
        "booking_request",
        "booking_confirmed",
        "booking_cancelled",
        "session_starting",
        "message_received",
        "review_received",
        "payment_completed",
      ],
      presence_status: ["offline", "available", "busy"],
      slot_status: ["open", "booked", "cancelled"],
      txn_type: [
        "deposit",
        "session_charge",
        "teacher_earning",
        "platform_fee",
        "refund",
        "withdrawal",
        "adjustment",
      ],
      user_role: ["student", "teacher", "admin"],
    },
  },
} as const
