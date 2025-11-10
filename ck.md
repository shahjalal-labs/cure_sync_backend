````
I want a Neovim Lua plugin or script that allows smart navigation across related module files in a structured TypeScript backend project. My project structure usually has folders like this:

/module/User
├── user.routes.ts
├── user.controller.ts
├── user.service.ts
├── user.validation.ts

Each file contains logical blocks annotated with special comments in the format:

--w: (start)╭──────────── blockName ────────────╮
...
--w: (end)  ╰──────────── blockName ────────────╯

The block names are not always identical across layers. Examples:

- Controller: `//w: (start)╭──────────── get all admin ────────────╮`
- Service:    `//w: (start)╭──────────── get all admin from db ────────────╮`

The navigation requirements are:

1. **Context detection:**
   - If the cursor is inside a route definition like:
     ```ts
     router.get("/admin", auth(), UserController.getAllAdmin)
     ```
     the navigator should detect `getAllAdmin` and target the corresponding controller function/block.
   - If the cursor is inside a `--w:` block in controller/service/validation, it should detect the current block name.

2. **Target selection:**
   - From a route file → navigate to the corresponding **controller** block.
   - From a controller → navigate to the corresponding **service** block.
   - From a service → navigate to the corresponding **controller** block.
   - From a validation → navigate to the corresponding **controller** block.

3. **Block matching:**
   - Primary: exact match of block name (ignoring extra whitespace or minor suffixes like `FromDB` or `Handler`).
   - Secondary: if exact block not found, try **partial word intersection** (example: `get all admin` → `get all admin from db`).
   - Tertiary: if no block match is found, open the sibling file anyway.

4. **Fallback behavior:**
   - Even if the block cannot be matched, the navigator should always open the sibling file.

5. **Implementation features:**
   - Works for `.ts` and `.js` files.
   - Automatically detects sibling files in the same module folder.
   - Key mapping: `<leader>nk` triggers navigation.
   - Jumps to the **start line of the matched block**.
   - Clean, readable Lua code that is maintainable and scalable.

6. **Examples of navigation:**
   - Cursor on `router.get("/admin", UserController.getAllAdmin)` → jump to the `--w:` block `get all admin` in `user.controller.ts`.
   - Cursor inside `--w: (start)╭──────────── getMyProfileFromDB ────────────╮` in controller → jump to `--w: (start)╭──────────── getMyProfileFromDB ────────────╮` in service.
   - Cursor inside `--w:` block in service → jump to controller block with highest word intersection, or open controller if no match.

7. **Assumptions:**
   - Each module folder contains `routes`, `controller`, `service`, and `validation` files.
   - Block comments follow my `--w: (start)╭──────────── blockName ────────────╮` format.
   - Function names and block names may not exactly match across layers, but usually share key words.

Write a complete Neovim Lua script implementing this navigation behavior, including:

- File scanning
- Block parsing
- Block matching (exact first, then partial word intersection)
- Fallback to sibling file
- Key mapping `<leader>nk`

Make the code readable, maintainable, and well-commented.

````

javedkarim.codes
email: javedkarim.codes@gmail.com
