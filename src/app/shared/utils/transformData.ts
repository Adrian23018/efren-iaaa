import { UserFile, UserFileBackend } from "@app/interfaces/files.model";

export class MapperTransformData {
    static transformUserFile(backend: UserFileBackend): UserFile {
        return {
            id: backend.id,
            userId: backend.user_id,
            weekStart: backend.week_start,
            weekEnd: backend.week_end,
            fullConversation: backend.full_conversation,
            summary: backend.summary,
            topics: backend.topics,
            emotionsDetected: backend.emotions_detected,
            mentalStateTags: backend.mental_state_tags,
            importantEvents: backend.important_events,
            conversationLength: backend.conversation_length,
            engagementLevel: backend.engagement_level,
            insights: backend.insights,
            reviewedByPsychologist: backend.reviewed_by_psychologist,
            notes: backend.notes,
            createdAt: backend.created_at,
            updatedAt: backend.updated_at,
            campaignsSent: backend.campaigns_sent,
            name: backend.name,
            email: backend.email,
            companyId: backend.company_id,
            planId: backend.plan_id,
            stripeCustomerId: backend.stripe_customer_id,
            active: backend.active,
            phone: backend.phone,
            stripeSubscriptionId: backend.stripe_suscription_id,
            payment: backend.payment,
            tags: backend.tags,
            utmSource: backend.utm_source,
            stripeStatus: backend.stripe_status,
            globalMember: backend.global_member,
            description: backend.description,
            maxMessages: backend.max_messages,
            price: backend.price,
            productId: backend.product_id,
            user_name: backend.user_name,
        }
    }
}
  