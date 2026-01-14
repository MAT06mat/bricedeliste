export interface StatsData {
    total: number;
    completed: number;
    top_requesters: Record<string, number>;
    top_targets: Record<string, number>;
    top_completers: Record<string, number>;
    top_types: Record<string, number>;
}
