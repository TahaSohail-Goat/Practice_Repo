# Lab Report — Git & GitHub (Calculator App)

**App:** Calculator (`index.html`, `script.js`, `style.css`)
**Repo:** https://github.com/TahaSohail-Goat/Practice_Repo
**Roles:** **Taha** = Person 1 (repo owner, "you"). **Shaheer** = Person 2 (collaborator, "your peer").

Legend: **[TAHA]** = only Taha runs this · **[SHAHEER]** = only Shaheer runs this · **[BOTH]** = each of you runs it on your own laptop.

---

## PART A — Create, Clone, Inspect

**[TAHA]** Created the private repo `Practice_Repo` on GitHub with a README, then added Shaheer as a Collaborator (Settings → Collaborators).
**[SHAHEER]** Accept the collaborator invite in your email or on GitHub before doing anything else.

**[BOTH]** Clone and open the repo (peer only — you already have it locally):
```
git clone https://github.com/TahaSohail-Goat/Practice_Repo.git
cd Practice_Repo
code .
```
Do **not** use "Download ZIP" (see Explore A-2).

**[BOTH]** Run `dir /a` (Windows) or `ls -a` (Mac/Linux) and confirm you both see a hidden `.git` folder.

### Checkpoint A ✅
Both laptops have the repo open in VS Code and both can see `.git`.

**Observation A:** The `.git` folder stores the entire version history of the project (commits, branches, tags, and all tracked file snapshots) as a database of objects. The **remote repository** (GitHub) is the team's "source of truth," since it's the shared copy both local repositories sync with.

**Explore A-1 (done):**
```
git remote -v
origin  https://github.com/TahaSohail-Goat/Practice_Repo.git (fetch)
origin  https://github.com/TahaSohail-Goat/Practice_Repo.git (push)
```
`origin` is just a nickname Git gives the remote URL you cloned from — it points at our GitHub repo above.

**Explore A-2:** Downloading the ZIP instead of cloning gives you the files but not the `.git` folder — no history, no remote link. Running `git status` in that folder produces:
```
fatal: not a git repository (or any of the parent directories): .git
```
What's missing is the `.git` folder itself — the ZIP only contains a snapshot of the files, not the version-control database that makes it a repository.

**Explore A-3:** Running `git init` in any empty folder creates a brand-new hidden `.git` folder in it, and `ls -a`/`dir /a` shows it appear. This proves a repo can exist entirely offline — GitHub is only needed once you want a remote copy to sync with.

---

## PART B — First Commit: the Three Areas

**[TAHA]** already created the starter files and committed them (`chore: Added a Calculator`), then pushed. Since we didn't mark the two conflict-zone lines with comments yet, do that now before Part C so both of you know exactly which lines to fight over:
```html
<h1>Simple Calculator</h1>          <!-- CONFLICT ZONE 1 -->
...
<button class="equals" data-action="equals">=</button>  <!-- CONFLICT ZONE 2 -->
```
Add the `<h1>` above `.calculator` in `index.html`, and the comment on the equals button line. Commit and push this small change with its own message, e.g. `git commit -m "mark conflict zones for lab exercise"`.

**[TAHA]** walk through the three areas once more so the table below is accurate (use a throwaway change, e.g. add a blank line, then undo, or just replay it mentally against the original commit):
```
git status          # (1)
git add .
git status          # (2)
git commit -m "mark conflict zones for lab exercise"
git status          # (3)
git push
```

**[SHAHEER]** Pull down everything Taha has pushed so far:
```
git pull
```

### Checkpoint B ✅
Identical files on both laptops and visible on GitHub.

**Observation B:**

| `git status` run | Where does the file live? | State |
|---|---|---|
| (1) before `add` | Working directory | Untracked / modified (red) |
| (2) after `add` | Staging area | Staged, ready to commit (green) |
| (3) after `commit` | Local repository (`.git` history) | Committed — working tree clean |

**Explore B-1:** Pressing Ctrl+S only writes to disk; `git log` shows no new entry and `git status` shows the file as "modified" but not committed. **Save ≠ commit** — saving just updates the file on your hard drive, while a commit is a permanent, recoverable snapshot in Git's history that the team can see, diff, and revert to.

**Explore B-2:** `git log` shows the full record per commit — author name/email, date, full hash, and the full commit message. `git log --oneline` compresses each commit to a short hash + first line of the message. The author matters because it tells the team *who* to ask about a change; the message matters because it tells everyone *why* the change was made without having to read the diff.

**Explore B-3:** Editing two files but running `git add` on only one lets you commit them **separately** — one logical change per commit — instead of bundling unrelated edits together the way Ctrl+S (which just saves everything at once) never could. This is the core of "staging": you choose exactly what goes into the next snapshot.

---

## PART C — Branch & Work in Parallel

**[BOTH]** Sync to the same starting point first — this is what guarantees the conflict later:
```
git checkout main
git pull
```

**[BOTH]** Create your own branch:
```
git checkout -b <your-branch-name>
git branch      # confirm the * is on your new branch
```
Example names: **[TAHA]** `logic-history`, **[SHAHEER]** `ui-theme` (pick whatever matches what you're actually building).

**[TAHA]** must:
- Change something in `script.js` (e.g., add a calculation history list, or keyboard-shortcut hint).
- Rewrite both conflict-zone lines to your own wording (the `<h1>` text and the `=` button label).

**[SHAHEER]** must:
- Rewrite the *same two* conflict-zone lines to your own, different wording — **without** telling Taha what you wrote.
- Add a `.gitignore` with at least two patterns, each justified in a one-line comment, e.g.:
  ```gitignore
  node_modules/   # dependency folder — huge, and regenerated by npm install, never needs to be tracked
  .vscode/        # personal editor settings — differ per machine, shouldn't be forced on teammates
  ```

**[BOTH]** Stage and commit on your own branch with a proper message (short, present tense, says what/why — no "stuff"/"update"/"fixed it").

### Checkpoint C ✅
`git log --oneline` on each laptop shows only your own commit(s); nobody has committed to `main` yet.

**Observation C:** We could both edit the same file at the same time today without the Day-1 "silent overwrite" because we were each working on our **own branch** — Git keeps every branch's file snapshots isolated until we deliberately merge them. Nothing gets overwritten until we combine the branches, and that's exactly when Git checks whether our changes actually collide.

**Explore C-1:** Switching to `git checkout main` makes your edits to `index.html` disappear from the working directory (they're not lost — they only exist on your branch); switching back to `git checkout <your-branch>` brings them back instantly. This shows a **branch is just a movable pointer to a commit** — checking it out swaps the entire working directory to match that pointer's snapshot.

**Explore C-2:** You can create as many branches as you want — they're just lightweight pointers, so making one (`git branch throwaway`) or deleting one (`git branch -d throwaway`) is instant and costs almost nothing in disk space. That's why the lecture calls them "cheap": there's no reason not to make a new branch for every small feature or experiment.

---

## PART D — Pull Requests: One Clean Merge, One Conflict

**[TAHA]** — the happy path:
```
git push -u origin <your-branch-name>
```
Then on GitHub: **Compare & pull request** → real title + 1-line description → **Create pull request**.

**[SHAHEER]** Open my PR → **Files changed** → read the actual diff → leave at least one real comment → **Approve**.

**[TAHA]** Once approved: **Merge pull request** → Confirm → **Delete branch**.

**[SHAHEER]** — the collision:
```
git push -u origin <your-branch-name>
```
Open PR #2 on GitHub. Read the merge-conflict warning GitHub shows, out loud, and note the Merge button is now disabled/greyed out.

**[SHAHEER]** Bring the conflict down to your machine:
```
git pull origin main
```
Open the conflicted file in VS Code and take **Screenshot 1** of the conflict markers.

### Checkpoint D ✅
PR #1 is Merged; PR #2 is blocked with a visible conflict in the peer's editor.

**Observation D:**
- **(a)** The `.js` change merged cleanly because Person 1 and Person 2 touched **different lines** of `script.js`; the `<h1>`/button lines conflicted because **both people edited the exact same lines** in the same file. The general rule: Git auto-merges when changes touch different lines (or different files) — it only stops and asks a human when both sides modify the *same* line(s) since the last common ancestor commit.
- **(b)** In the marker block, the section between `<<<<<<< HEAD` and `=======` is **your peer's current branch/main content** (what's already there), and the section between `=======` and `>>>>>>> <branch-name>` is the **incoming change** being merged in — the label after `>>>>>>>` names exactly which branch it came from.
- **(c)** No work was lost — GitHub simply refuses to auto-merge and pauses the PR. Both versions of the conflicting lines are preserved inside the markers until a human chooses (or combines) one.

**Explore D-1:** Yes — technically Person 2 could review the diff even if Person 1 had pushed straight to `main`, by looking at the commit history. But without a PR the team loses: a dedicated review step *before* the change lands, inline commenting on specific lines, a required-approval gate, and a clean record of *who approved what and why* — a PR turns "I looked at it after the fact" into "nothing merges until someone signs off."

**Explore D-2:** Predictions before trying, then the actual result:
| Option | Predicted result |
|---|---|
| Accept Current Change | Keeps only *your* (local/HEAD) version of the line |
| Accept Incoming Change | Keeps only the *incoming* (main/other branch) version |
| Accept Both Changes | Keeps both lines, one after another (usually produces broken/duplicate HTML) |
| Compare Changes | Opens a side-by-side diff so you can see both versions before choosing |

---

## PART E — Resolve, Merge, Verify

**[BOTH]** Talk it out first — decide together on the final wording for the `<h1>` and the button label (keep one side, the other, or write a new compromise). *(Write your team's actual decision + one-line justification here once you've had the conversation.)*

**[SHAHEER]** Apply the agreed text in VS Code (button or hand-edit). Two hard rules:
- exactly one final version of each line remains;
- zero marker characters remain — search the file for `<<<` to confirm.

Save the file and take **Screenshot 2** of the resolved file.

**[SHAHEER]** Record the resolution and unblock the PR:
```
git add index.html
git commit -m "resolve heading/button text conflict: agreed with peer on final wording"
git push
```
Refresh PR #2 → Merge button is active → **Merge** → **Delete branch**. Take **Screenshot 3** of the "Merged" badge.

**[BOTH]** Close the loop:
```
git checkout main
git pull
```
Open `index.html` in a browser and click the button — confirm `main` actually works, not just that it merged.

### Checkpoint E ✅
Both laptops show the identical agreed version; the app runs.

**Observation E:** The commit made in E3 is a **merge-resolution commit** — unlike a normal commit, it records how a conflict between two people's work was deliberately settled, and it typically has **two parent commits** (one from each branch) instead of one. The decision carries whoever ran `git commit` on the resolution — here, Person 2 — but the *content* of the decision belongs to both, since it was agreed on together in the E1 conversation.

**Explore E-1:** `git log --oneline --graph --all` shows the history as a graph. Roughly:
```
*   merge commit (main) — conflict resolved
|\
| * peer's branch commit (heading/button rewrite + .gitignore)
* | your branch commit (heading/button rewrite + script.js change) — already merged via PR #1
|/
* earlier shared commit on main
```
The two branches **split** at the shared commit from Part C (after `git pull` on `main`) and **rejoin** at the merge-resolution commit from Part E.

**Explore E-2:** "Accept Both Changes" on the heading would have kept **both** `<h1>` lines stacked one after another in the file — syntactically valid but visually wrong (two headings would render on the page instead of one). It's rarely what you want for conflicting text; it's more useful when both changes are independent list items or lines that genuinely belong together.

**Explore E-3 (challenge):** *(Fill in once attempted — note your time and what part of `script.js` you deliberately conflicted on.)*

---

## Key Takeaway

The Day-1 "silent overwrite" problem never happened here because Git never lets two people's changes merge invisibly: it either combines non-overlapping edits automatically, or stops and forces a human decision when lines actually collide. Branches gave us parallel work, Pull Requests gave us review before merging, and the conflict in Part D is exactly what a 20-second conversation in Part E's style — held *before* Part C instead of after — would have avoided entirely.
