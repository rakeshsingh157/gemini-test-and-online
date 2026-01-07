import { GeminiService } from "../services/gemini.js";
import { EmailService } from "../services/email.js";
import { generateCyberEmail } from "../services/templates/cyber.js";
import { STABLE_MODELS, CANDIDATE_MODELS } from "../config/models.js";

// Store latest results in memory for the dashboard
export let dashboardData = {};

export class DailyJob {
    static async run() {
        console.log("🔄 Starting Daily Gemini Health Check...");

        // --- 1. Check Stable Models ---
        // Condition: Alert if ANY fail
        const stableResults = await GeminiService.checkBatch(STABLE_MODELS);
        const failedStable = stableResults.filter(r => !r.success);

        // Update Dashboard Data (Stable)
        stableResults.forEach(r => dashboardData[r.name] = r);

        if (failedStable.length > 0) {
            const title = "🚨 CRITICAL: Gemini Failure";
            const msg = "The following stable production models have gone OFFLINE. Immediate attention required.";
            const html = generateCyberEmail(title, msg, failedStable);

            await EmailService.sendAlert(
                title,
                msg, // text fallback
                html // cyber template
            );
        } else {
            console.log("✅ All Stable Models Online.");
        }

        // --- 2. Check Candidate Models ---
        // Condition: Alert if ANY success (New working model found)
        // We only test a subset to avoid quota spam, or test all if user wants "everyday"
        // User said "auto test everyday in this model... if any scuess mail"
        const candidateResults = await GeminiService.checkBatch(CANDIDATE_MODELS);
        const workingCandidates = candidateResults.filter(r => r.success);

        // Update Dashboard Data (Candidates - Optional, mainly interested in stable for 3D orb, but good to track)
        candidateResults.forEach(r => dashboardData[r.name] = r);

        if (workingCandidates.length > 0) {
            const title = "🎉 NEW DISCOVERY";
            const msg = "New working models have been detected in the candidate pool. These should be considered for promotion to Stable.";
            const html = generateCyberEmail(title, msg, workingCandidates);

            await EmailService.sendAlert(
                title,
                msg,
                html
            );
        } else {
            console.log("ℹ️ No new working candidate models found.");
        }

        console.log("🏁 Daily Check Completed.");
        return dashboardData;
    }
}
