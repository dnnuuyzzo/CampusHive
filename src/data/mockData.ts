import type { User, Course, Question, ProjectPitch, StudyRoom, Badge } from '../types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Algorithm Pro',
    description: '5+ accepted CS solutions',
    icon: '⚡',
    category: 'academic',
  },
  {
    id: 'b2',
    name: 'Top Peer Tutor',
    description: 'Top 3 contributor this term',
    icon: '🏆',
    category: 'community',
  },
  {
    id: 'b3',
    name: 'Idea Catalyst',
    description: 'Recruited 3+ teammates',
    icon: '🚀',
    category: 'project',
  },
  {
    id: 'b4',
    name: 'Night Owl',
    description: 'Active past 10 PM',
    icon: '🌙',
    category: 'community',
  },
  {
    id: 'b5',
    name: 'Verified Student',
    description: 'Campus email verified',
    icon: '🎓',
    category: 'academic',
  }
];

export const CURRENT_USER: User = {
  id: 'usr-me',
  name: 'Budi Prasetyo',
  email: 'budi.prasetyo@univ.ac.id',
  university: 'Universitas Indonesia',
  nim: '2206081234',
  faculty: 'Computer Science',
  major: 'Informatics Engineering',
  semester: 4,
  reputation: 165,
  badges: [ALL_BADGES[0], ALL_BADGES[4]],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  isPseudonymous: false,
};

export const COURSES: Course[] = [
  { id: 'c1', code: 'CS204', name: 'Data Structures & Algorithms', faculty: 'Computer Science', color: 'bg-blue-500' },
  { id: 'c2', code: 'IS302', name: 'Database Management Systems', faculty: 'Information Systems', color: 'bg-emerald-500' },
  { id: 'c3', code: 'MATH102', name: 'Calculus & Linear Algebra', faculty: 'Science & Math', color: 'bg-purple-500' },
  { id: 'c4', code: 'TI201', name: 'English for IT', faculty: 'General Courses', color: 'bg-amber-500' },
  { id: 'c5', code: 'CS310', name: 'Web & Mobile Apps', faculty: 'Computer Science', color: 'bg-indigo-500' },
  { id: 'c6', code: 'BUS105', name: 'Tech Entrepreneurship', faculty: 'Economics', color: 'bg-rose-500' },
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-101',
    title: 'Dijkstra with priority queue: avoiding TLE in Python?',
    content: "My heapq implementation works on test cases, but times out on large graphs with 10^5 vertices. How should I prune visited nodes?",
    codeSnippet: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        curr_dist, curr_node = heapq.heappop(pq)
        # Pruning condition here
        for neighbor, weight in graph[curr_node]:
            # ...
    return distances`,
    courseId: 'c1',
    courseCode: 'CS204',
    courseName: 'Data Structures & Algorithms',
    faculty: 'Computer Science',
    tags: ['Python', 'Dijkstra', 'Graph', 'Algorithms'],
    author: {
      id: 'usr-2',
      name: 'Rian Firdaus',
      email: 'rian.f@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2306012891',
      faculty: 'Computer Science',
      major: 'Computer Science',
      semester: 2,
      reputation: 85,
      badges: [ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    },
    createdAt: '15m ago',
    upvotes: 8,
    hasUpvoted: false,
    isSolved: true,
    answers: [
      {
        id: 'ans-201',
        questionId: 'q-101',
        author: {
          id: 'usr-3',
          name: 'Amanda Kusuma',
          email: 'amanda.k@univ.ac.id',
          university: 'Universitas Indonesia',
          nim: '2106099120',
          faculty: 'Computer Science',
          major: 'Information Systems',
          semester: 6,
          reputation: 430,
          badges: [ALL_BADGES[0], ALL_BADGES[1], ALL_BADGES[4]],
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
        },
        content: "Add a check right after popping: `if curr_dist > distances[curr_node]: continue`. Since Python heapq lacks decrease-key, this skips stale paths and stops TLE.",
        codeSnippet: `while pq:
    curr_dist, curr_node = heapq.heappop(pq)
    if curr_dist > distances[curr_node]:
        continue
    for neighbor, weight in graph[curr_node]:
        dist = curr_dist + weight
        if dist < distances[neighbor]:
            distances[neighbor] = dist
            heapq.heappush(pq, (dist, neighbor))`,
        createdAt: '8m ago',
        upvotes: 14,
        hasUpvoted: true,
        isAccepted: true,
      }
    ],
  },
  {
    id: 'q-102',
    title: '3NF vs BCNF: intuitive comparison & real example?',
    content: "Need a quick intuitive explanation of BCNF when overlapping candidate keys occur (e.g. room booking or student advisory).",
    courseId: 'c2',
    courseCode: 'IS302',
    courseName: 'Database Management Systems',
    faculty: 'Information Systems',
    tags: ['Database', 'SQL', 'Normalization', 'BCNF'],
    author: {
      id: 'usr-4',
      name: 'Nadia Putri',
      email: 'nadia.p@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2206077312',
      faculty: 'Information Systems',
      major: 'Information Systems',
      semester: 4,
      reputation: 95,
      badges: [ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    },
    createdAt: '1h ago',
    upvotes: 5,
    hasUpvoted: false,
    isSolved: false,
    answers: [],
  },
  {
    id: 'q-103',
    title: 'Structuring a 3-minute app pitch for TI class?',
    content: "What is the optimal split between hook, core features, and call-to-action for our 3-min video pitch assignment?",
    courseId: 'c4',
    courseCode: 'TI201',
    courseName: 'English for IT',
    faculty: 'General Courses',
    tags: ['Presentation', 'Pitching', 'SoftSkills'],
    author: {
      id: 'usr-me',
      name: 'Budi Prasetyo',
      email: 'budi.prasetyo@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2206081234',
      faculty: 'Computer Science',
      major: 'Informatics Engineering',
      semester: 4,
      reputation: 165,
      badges: [ALL_BADGES[0], ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    },
    createdAt: '3h ago',
    upvotes: 11,
    hasUpvoted: false,
    isSolved: false,
    answers: [
      {
        id: 'ans-203',
        questionId: 'q-103',
        author: {
          id: 'usr-5',
          name: 'Kevin Wijaya',
          email: 'kevin.w@univ.ac.id',
          university: 'Universitas Indonesia',
          nim: '2106044199',
          faculty: 'Industrial Engineering',
          major: 'Industrial Engineering',
          semester: 6,
          reputation: 210,
          badges: [ALL_BADGES[2], ALL_BADGES[4]],
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        },
        content: "Pitch breakdown: 30s Hook & Problem, 45s Solution, 60s Killer Features (max 2-3), and 45s Strong Call-to-Action. Bold visuals, minimal text!",
        createdAt: '2h ago',
        upvotes: 9,
        hasUpvoted: false,
        isAccepted: false,
      }
    ],
  }
];

export const INITIAL_PROJECTS: ProjectPitch[] = [
  {
    id: 'proj-1',
    title: 'EcoFood: Canteen Surplus Saver',
    tagline: 'Discounted meals from campus canteens to stop food waste.',
    description: 'Web app connecting students with 50-70% discounted meals from faculty canteens during the closing hour.',
    category: 'Tech / App',
    author: {
      id: 'usr-5',
      name: 'Kevin Wijaya',
      email: 'kevin.w@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2106044199',
      faculty: 'Industrial Engineering',
      major: 'Industrial Engineering',
      semester: 6,
      reputation: 210,
      badges: [ALL_BADGES[2], ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    },
    openRoles: [
      { role: 'UI/UX Designer', count: 1, filled: 0 },
      { role: 'Frontend Dev', count: 2, filled: 1 },
      { role: 'Operations', count: 1, filled: 1 },
    ],
    applicants: [],
    createdAt: 'Yesterday',
    likes: 24,
    hasLiked: false,
  },
  {
    id: 'proj-2',
    title: 'PaperMate: Thesis Citation Map',
    tagline: 'Visual citation graph and reading lists for undergrad research.',
    description: 'Interactive map to explore related papers, detect missing citations, and share thesis reading lists.',
    category: 'Academic Competition',
    author: {
      id: 'usr-3',
      name: 'Amanda Kusuma',
      email: 'amanda.k@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2106099120',
      faculty: 'Computer Science',
      major: 'Information Systems',
      semester: 6,
      reputation: 430,
      badges: [ALL_BADGES[0], ALL_BADGES[1], ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    },
    openRoles: [
      { role: 'NLP Engineer', count: 1, filled: 0 },
      { role: 'Data Curator', count: 1, filled: 0 },
    ],
    applicants: [],
    createdAt: '2d ago',
    likes: 38,
    hasLiked: true,
  }
];

export const STUDY_ROOMS: StudyRoom[] = [
  {
    id: 'room-1',
    title: 'CS204: Tree & Graph Drills',
    courseCode: 'CS204',
    courseName: 'Data Structures & Algorithms',
    hostName: 'Amanda Kusuma',
    activeUsers: 8,
    maxUsers: 15,
    topic: 'Past exam problems (2024-2025)',
    startedAt: 'Active now',
  },
  {
    id: 'room-2',
    title: 'TI201: 3-Min Pitch Rehearsal',
    courseCode: 'TI201',
    courseName: 'English for IT',
    hostName: 'Budi Prasetyo',
    activeUsers: 4,
    maxUsers: 10,
    topic: 'Dry runs & delivery feedback',
    startedAt: 'Active now',
  },
  {
    id: 'room-3',
    title: 'MATH102: Series Convergence',
    courseCode: 'MATH102',
    courseName: 'Calculus & Linear Algebra',
    hostName: 'Farhan Maulana',
    activeUsers: 6,
    maxUsers: 12,
    topic: 'Ratio test & Taylor series',
    startedAt: 'Active now',
  }
];

export const LEADERBOARD_USERS: { user: User; points: number; rank: number; answersCount: number; title: string }[] = [
  {
    user: {
      id: 'usr-3',
      name: 'Amanda Kusuma',
      email: 'amanda.k@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2106099120',
      faculty: 'Computer Science',
      major: 'Information Systems',
      semester: 6,
      reputation: 430,
      badges: [ALL_BADGES[0], ALL_BADGES[1], ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    },
    points: 430,
    rank: 1,
    answersCount: 28,
    title: 'Senior Mentor',
  },
  {
    user: {
      id: 'usr-5',
      name: 'Kevin Wijaya',
      email: 'kevin.w@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2106044199',
      faculty: 'Industrial Engineering',
      major: 'Industrial Engineering',
      semester: 6,
      reputation: 210,
      badges: [ALL_BADGES[2], ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    },
    points: 210,
    rank: 2,
    answersCount: 15,
    title: 'Idea Builder',
  },
  {
    user: CURRENT_USER,
    points: 165,
    rank: 3,
    answersCount: 11,
    title: 'Contributor',
  },
  {
    user: {
      id: 'usr-4',
      name: 'Nadia Putri',
      email: 'nadia.p@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2206077312',
      faculty: 'Information Systems',
      major: 'Information Systems',
      semester: 4,
      reputation: 95,
      badges: [ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    },
    points: 95,
    rank: 4,
    answersCount: 6,
    title: 'Inquirer',
  },
  {
    user: {
      id: 'usr-2',
      name: 'Rian Firdaus',
      email: 'rian.f@univ.ac.id',
      university: 'Universitas Indonesia',
      nim: '2306012891',
      faculty: 'Computer Science',
      major: 'Computer Science',
      semester: 2,
      reputation: 85,
      badges: [ALL_BADGES[4]],
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    },
    points: 85,
    rank: 5,
    answersCount: 4,
    title: 'Freshman',
  }
];
