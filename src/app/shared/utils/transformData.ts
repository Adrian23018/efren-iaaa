import { UserFile, UserFileBackend } from "@app/interfaces/files.model";
import {
    Metrics,
    MetricsTopUtmSource,
    MetricsMessageUsage,
} from '@app/interfaces/metrics-data.model';
import { MetricsMessageUsageResponse, MetricsResponse, MetricsTopUtmSourceResponse } from "@app/interfaces/metrics-response.model";

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

    static transformMetricsResponse(backend: MetricsResponse): Metrics {
        return {
            startDate: backend.start_date ?? '',
            endDate: backend.end_date ?? '',
            intervalType: backend.interval_type ?? '',
            generalMetrics: {
                totalUsers: backend?.general_metrics?.total_users ?? 0,
                totalInteractions: backend?.general_metrics?.total_interactions ?? 0,
                conversionsDemoToPlan: backend?.general_metrics?.conversions_demo_to_plan ?? 0,
                totalRevenue: backend?.general_metrics?.total_revenue ?? 0,
                totalUsersWithPlans: backend?.general_metrics?.total_users_with_plans ?? 0,
                activePlans: backend?.general_metrics?.active_plans ?? 0,
                proPurchases: backend?.general_metrics?.pro_purchases ?? 0,
                proCancellations: backend?.general_metrics?.pro_cancellations ?? 0,
                elitePurchases: backend?.general_metrics?.elite_purchases ?? 0,
                eliteCancellations: backend?.general_metrics?.elite_cancellations ?? 0,
            },
            accumulatedIncome: (backend?.ingresosAcumulados?? [])
               .map(item => ({
                    date: item.periodo_str ?? '',
                    month: item.mes_abbr ?? '',
                    value: item.monto_acumulado ?? 0,
                })),
            montlyIncome: (backend?.ingresosMensuales?? [])
                .map(item => ({
                     date: item.periodo_str ?? '',
                     month: item.mes_abbr ?? '',
                     value: item.monto_total_mes ?? 0,
                 })),
            earlyAlerts: {
                proPlanNoInteraction3Days: backend?.early_alerts?.pro_plan_no_interaction_3days ?? 0,
                elitePlanNoInteraction6Days: backend?.early_alerts?.elite_plan_no_interaction_6days ?? 0,
                selectedPlanNoPurchase: {
                    total: backend?.early_alerts?.selected_plan_no_purchase?.total ?? 0,
                    pro: backend?.early_alerts?.selected_plan_no_purchase?.pro ?? 0,
                    elite: backend?.early_alerts?.selected_plan_no_purchase?.elite ?? 0,
                },
                termsNotAccepted: backend?.early_alerts?.terms_not_accepted ?? 0,
                canceledServiceCount: backend?.early_alerts?.canceled_service_count ?? 0,
            },
            userMetrics: {
                messagesMetrics: {
                    avgMessages: backend?.user_metrics?.messages_metrics?.avg_messages ?? 0,
                    totalMessages: backend?.user_metrics?.messages_metrics?.total_messages ?? 0,
                    activeUsersCount: backend?.user_metrics?.messages_metrics?.active_users_count ?? 0,
                },
                retentionRatePercent: backend?.user_metrics?.retention_rate_percent ?? null,
                renewalRatePercent: backend?.user_metrics?.renewal_rate_percent ?? 0,
            },
            advancedMetrics: {
                topUtmSources: (backend?.advanced_metrics?.top_utm_sources ?? [])
                .map((item: MetricsTopUtmSourceResponse): MetricsTopUtmSource => ({
                    source: item.source ?? '',
                    revenue: item.revenue ?? 0,
                    userCount: item.user_count ?? 0,
                })),
                messageUsageByPlan: (backend?.advanced_metrics?.message_usage_by_plan ?? [])
                .map((item: MetricsMessageUsageResponse): MetricsMessageUsage => ({
                    planName: item.plan_name ?? '',
                    totalMessages: item.total_messages ?? 0,
                    userCount: item.user_count ?? 0,
                    avgMessagesPerUser: item.avg_messages_per_user ?? 0,
                }))
            },
            totalNetRevenue: backend.total_net_revenue ?? 0,
            plans: {
                pro: backend?.plans?.pro ?? 0,
                elite: backend?.plans?.elite ?? 0,
            },
            monthlyPlanActivity: (backend?.monthly_plan_activity ?? [])
                .map(item => ({
                        period: item.period ?? '',
                        proPurchases: item.proPurchases ?? 0,
                        proCancellations: item.proCancellations ?? 0,
                        elitePurchases: item.elitePurchases ?? 0,
                        eliteCancellations: item.eliteCancellations ?? 0,
                    })),
        };
    }

    static transformMetricsResponseArray(backendArray: MetricsResponse[]): Metrics[] {
        return (backendArray ?? []).map(item => this.transformMetricsResponse(item));
    }
}
