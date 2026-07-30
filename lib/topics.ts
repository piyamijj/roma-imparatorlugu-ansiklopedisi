import fs from "fs";
import path from "path";
import { TopicListEntry, SectionSlug, GeneratedTopicFile } from "./types";

/**
 * topics.ts
 * 
 * Server-side data access utility functions for the Roman Empire Encyclopedia.
 * These functions read and parse the structured JSON files (topicList.json and individual
 * topic content files) at build time or request time.
 */

/**
 * Reads and parses the master topic list from data/topicList.json.
 * @returns Array of all topic metadata entries.
 */
export function getAllTopics(): TopicListEntry[] {
  try {
    const filePath = path.join(process.cwd(), "data", "topicList.json");
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: Master topic list not found at ${filePath}`);
      return [];
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as TopicListEntry[];
  } catch (err) {
    console.error("Error reading master topic list:", err);
    return [];
  }
}

/**
 * Filters the master topic list to return only topics belonging to a specific section.
 * @param section The section slug to filter by.
 * @returns Array of topic metadata entries for that section.
 */
export function getTopicsBySection(section: SectionSlug): TopicListEntry[] {
  return getAllTopics().filter((topic) => topic.section === section);
}

/**
 * Finds a single topic's metadata entry by its unique slug.
 * @param slug The topic slug.
 * @returns The topic metadata entry, or undefined if not found.
 */
export function getTopicMeta(slug: string): TopicListEntry | undefined {
  return getAllTopics().find((topic) => topic.slug === slug);
}

/**
 * Attempts to read and parse a generated topic content file from data/topics/<slug>.json.
 * If the file does not exist or is malformed, returns null instead of throwing.
 * This allows the UI to gracefully render a "coming soon" placeholder.
 * @param slug The topic slug.
 * @returns The parsed topic content file, or null if not generated/malformed.
 */
export function getGeneratedTopicContent(slug: string): GeneratedTopicFile | null {
  try {
    const filePath = path.join(process.cwd(), "data", "topics", `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as GeneratedTopicFile;
  } catch (err) {
    console.error(`Error reading generated content for topic ${slug}:`, err);
    return null;
  }
}

/**
 * Fast check to determine if a topic content file has been generated on disk.
 * Avoids reading or parsing the file, making it suitable for list pages.
 * @param slug The topic slug.
 * @returns True if the JSON file exists on disk, false otherwise.
 */
export function hasGeneratedContent(slug: string): boolean {
  const filePath = path.join(process.cwd(), "data", "topics", `${slug}.json`);
  return fs.existsSync(filePath);
}

/**
 * Returns a list of topic slugs in a section that currently have generated content.
 * Useful for section landing pages to show progress or prioritize links.
 * @param section The section slug.
 * @returns Array of generated topic slugs.
 */
export function getGeneratedSlugsBySection(section: SectionSlug): string[] {
  return getTopicsBySection(section)
    .map((t) => t.slug)
    .filter((slug) => hasGeneratedContent(slug));
}