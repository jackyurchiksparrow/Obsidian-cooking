class RecipeScaler {
    // ---------------- CONSTANTS SECTION START ----------------
    // Bugs:
    // 1. if you switch from the tab looking at other tables rather than at those at the top of the page, next tab scale functionality might not work until you close the first tab
    // 2. If you had many tabs opened at the moment of opening the editor and you didn't open the tabs sequentially, the DOM won't include those elements and the constant indices won't work and won't we able to tell where you are currently. You need to close others first.

    // array that holds all declared intervals
    static intervals = [];
    // the amount of buttons per page (in the top of the page where all functionality is)
    static AMOUNT_OF_BUTTONS_PER_PAGE = 5;
    // the amount of tables per page (in the top of the page where all functionality is)
    static AMOUNT_OF_TABLES_PER_PAGE = 3;
    // the index of the button (holds the scale value) on the whole page 0 - the first button on the page, 1 - the second etc.
    static SCALE_VALUE_BUTTON_ORDER_IDX = 0;
    // the index of the button (runs the event of scaling) on the whole page 0 - the first button on the page, 1 - the second etc.
    static SCALE_BUTTON_ORDER_IDX = 1;
    // the index of the table (for ingredients list) on the whole page 0 - the first table on the page, 1 - the second etc.
    static INGREDIENTS_TABLE_ORDER_IDX = 1;
    // the index of the 
    static MATH_EXPRESSION_CONT_ORDER_IDX = 2;
    static CALCULATE_EXPRESSION_BUTTON_ORDER_IDX = 3;
    static HIDE_PERCENTAGE_COLUMNS_ORDER_IDX = 4;

    // LOWERCASE ingredients table column names; they work by the fuzzy principle of "includes" (with the exception of ING_TBL_PERCENTAGE_COL that compares strictly)
    static ING_TBL_INGREDIENTS_COL = "ingredient";
    static ING_TBL_QUANTITY_COL = "quantity";
    static ING_TBL_BAKERS_PERCENTAGE_COL = "baker's %";
    static ING_TBL_NOTE_COL = "note";
    static ING_TBL_SCALED_COL = "scaled";
    static ING_TBL_PERCENTAGE_COL = "%";

    // keywords for ingredients considered as "flour"; checked with contains(), lowercased
    static ING_TBL_FLOUR_KEYS = ["flour", "malt", "cocoa powder", "cornstarch", "kerob"];

    // keywords for ingredients considered as "water" at the respective percentage for each; checked with contains(), lowercased
    static ING_TBL_WATER_KEYS = {"water": 100, "milk": 97.5, "yolk": 50, "egg": 75, "butter": 16, "sour cream": 75, "heavy cream": 67, "whipping cream": 67, "coconut cream": 80, "juice": 98};

    // LOWERCASE ingredients table row name for the one that needs to contain the overall weight of ingredients; matched by contains()
    static OVERALL_WEIGHT_ROW = "overall weight";

    // LOWERCASE ingredients table row name for overall hydration of sourdough based on everything that includes "water" + the starter hydration; matched by contains()
    static OVERALL_HYDRATION_ROW = "overall hydration";

    // the name a new tab has when no notes are opened (system placeholder); matched exactly
    static NEW_TAB_PLACEHOLDER = 'New tab';

    // precision of rounding in the ingredients table (the number of decimals)
    static ING_TBL_DECIMALS = 1;

    // ---------------- CONSTANTS SECTION FINISH ----------------

    RecipeScaler() {
        console.log(`Running...`);

        // get the indexes of the very first idx of the table on the current tab (provided that others were opened during this session) and the respective index to start counting from to find html elements in DOM
        let [first_table_idx, start_from_idx] = this.calculate_button_positions();
        // Indexes for targeting specific elements within the DOM
        this.scale_value_element_pos_index = start_from_idx+RecipeScaler.SCALE_VALUE_BUTTON_ORDER_IDX;
        this.scale_the_ingredients_button_pos_index = start_from_idx+RecipeScaler.SCALE_BUTTON_ORDER_IDX;
        this.table_with_ingredients_pos_index = first_table_idx+RecipeScaler.INGREDIENTS_TABLE_ORDER_IDX;
        this.math_expression_cont_pos_index = start_from_idx+RecipeScaler.MATH_EXPRESSION_CONT_ORDER_IDX;
        this.calculate_expression_button_pos_index = start_from_idx+RecipeScaler.CALCULATE_EXPRESSION_BUTTON_ORDER_IDX;
        this.hide_percentage_columns_pos_index = start_from_idx+RecipeScaler.HIDE_PERCENTAGE_COLUMNS_ORDER_IDX;

        // listeners are set up
        this.setupListeners();
    }

    // Sets up listeners to detect DOM changes, rechecking elements periodically
    // because when DOM elements are not on the screen, the program loses them
    setupListeners() {
        if (this.finish_if_no_tabs_opened())
            return;

        // Periodically recheck the DOM every second
        // Only create the interval if it doesn’t exist yet
        if(RecipeScaler.intervals.length > 0) {
            RecipeScaler.clearAllIntervals();
        }
    
        RecipeScaler.intervals.push(setInterval(() => this.checkAndAddListeners(), 1000));
    }

    finish_if_no_tabs_opened() {
        let is_active_tabs = this.isActiveTabsOpened();         
            
        if(!is_active_tabs) {
            RecipeScaler.clearAllIntervals();
            console.log("Finished");
            return true;
        }

        return false;
    }

    // Ensures that listeners are attached only when elements are available
    checkAndAddListeners() {
        console.log("checkAndAddListeners();");
        const h6_headers = document.querySelectorAll('.HyperMD-header-6 span.cm-header-6:last-of-type');
        this.scaleIngredientsValue_container = h6_headers[this.scale_value_element_pos_index];
        this.scaleIngredients_button = h6_headers[this.scale_the_ingredients_button_pos_index];
        this.calculate_expression_container = h6_headers[this.math_expression_cont_pos_index];
        this.calculate_expression_button = h6_headers[this.calculate_expression_button_pos_index];
        this.hide_percentage_columns_button = h6_headers[this.hide_percentage_columns_pos_index];


        // Select all close tab buttons
        this.close_a_tab_buttons = document.querySelectorAll(".workspace-tabs.mod-top.mod-top-right-space.mod-active .workspace-tab-header-container .workspace-tab-header-inner-close-button");
        this.non_active_tabs = document.querySelectorAll(".workspace-tabs.mod-top.mod-top-right-space.mod-active .workspace-tab-header-container .workspace-tab-header.tappable:not(.is-active)");
        this.tree_structure_files = document.querySelectorAll(".tree-item-self.nav-file-title.tappable.is-clickable");

        // Add listener only if the button exists and doesn't already have one
        if (this.scaleIngredients_button && !this.scaleIngredients_button.listenerAdded) {
            this.addScaleIngredientsButtonListener();
            this.scaleIngredients_button.listenerAdded = true;
        }

        if(this.scaleIngredientsValue_container && !this.scaleIngredientsValue_container.listenerAdded) {
            this.addScaleIngredientsValue_containerButtonListener();
            this.scaleIngredientsValue_container.listenerAdded = true;
        }

        if(this.calculate_expression_button && !this.calculate_expression_button.listenerAdded) {
            this.addCalculateExpressionButtonListener();
            this.calculate_expression_button.listenerAdded = true;
        }

        if(this.hide_percentage_columns_button && !this.hide_percentage_columns_button.listenerAdded) {
            // update button text in case irrelevant toggle label exists
            this.hide_percentage_columns_button.textContent = "Hide percentage columns";
            this.addHidePercentageColumnsButtonListener();
            this.hide_percentage_columns_button.listenerAdded = true;
        }

        if(this.tree_structure_files) {
            this.tree_structure_files.forEach(file => {
                if(!file.listenerAdded) {
                    this.addTreeStructureFilesButtonListener(file);
                    file.listenerAdded = true;
                }
            });
        }

        // Add listener to call the deconstructor when the non-active (not current) tab is clicked
        if (this.non_active_tabs) {
            this.non_active_tabs.forEach(tab => {
                if (!tab.listenerAdded) {
                    this.addNonActiveTabsButtonListener(tab);
                    tab.listenerAdded = true;
                }
            });
        }

        // Then: Loop through each close button and add listeners
        if (this.close_a_tab_buttons) {
            this.close_a_tab_buttons.forEach((button) => {
                // Check if a listener was already added to avoid stacking
                if (!button.listenerAdded) {
                    this.addCloseATabButtonListener(button);
                    button.listenerAdded = true;  // Track that listener has been added
                }
            });
        }

    }

    addScaleIngredientsValue_containerButtonListener() {
        const scaleIngredientsMainParent = document.querySelectorAll('.HyperMD-header-6')[this.scale_value_element_pos_index];

        scaleIngredientsMainParent.addEventListener('mouseover', (event) => {
            // Use mousedown instead of click
            const range = document.createRange();
            range.selectNodeContents(scaleIngredientsMainParent);
            const selection = window.getSelection();
            selection.removeAllRanges(); // Clear any existing selections
            selection.addRange(range); // Add the new range
    
            // Optional: Prevent the default behavior to avoid conflicts with other events
            event.preventDefault(); 
        });
    }
    

    // Retrieves and parses the scale value input by the user
    getScaleIngredientsValue() {
        if(!this.scaleIngredientsValue_container)
            this.scaleIngredientsValue_container = document.querySelectorAll('.HyperMD-header-6 span.cm-header-6:last-of-type')[this.scale_value_element_pos_index];

        if(this.scaleIngredientsValue_container)
            return parseFloat(this.scaleIngredientsValue_container.textContent);
        else return 1;
    }

    addCloseATabButtonListener(button) {
        button.addEventListener('click', (event) => {
            console.log("The tab was closed");
            this.deconstructor();
        });
    }

    addTreeStructureFilesButtonListener(file) {
        ['click', 'dragenter'].forEach((evt) => {
            if(!file.listenerAdded)
                file.addEventListener(evt, (event) => {
                    console.log("addTreeStructureFilesButtonListener()");
                    this.deconstructor();       
        
                    setTimeout(() => {
                        this.RecipeScaler();
                    }, 500);

                    file.listenerAdded = true;
                });
        })
    }

    isActiveTabsOpened() {
        const active_tabs = document.querySelectorAll(".workspace-tabs.mod-top.mod-top-right-space.mod-active .workspace-tab-header-container .workspace-tab-header.tappable.is-active.mod-active .workspace-tab-header-inner-title");
        
        if(active_tabs.length == 0)
            return true;
        
        let is_active_tabs = false;

        for (let i = 0; i < active_tabs.length; i++) {
            const tab_title_el = active_tabs[i];

            if(tab_title_el.textContent != RecipeScaler.NEW_TAB_PLACEHOLDER) {
                is_active_tabs = true;
                break;
            }   
        }

        return is_active_tabs;
    }

    addCalculateExpressionButtonListener() {
        if(this.calculate_expression_container)
            this.calculate_expression_button.addEventListener('click', (event) => {
                let expression = this.calculate_expression_container.textContent.trim(); // Get the current text
                let result = 0;

                if(expression.includes("="))
                    expression = expression.replace(/=.*/, "").trim(); // Replace everything after '='
                
                try {
                    result = eval(expression); // Evaluate the expression
                } catch (err) {
                    alert(err);
                    return; // Exit if there's an error
                }
                
                this.calculate_expression_container.textContent = `${expression} = ${RecipeScaler.round(result,2)}`; // Update the h6 with the result
            });
    }

    addHidePercentageColumnsButtonListener() {
        // Function to merge specific rows in the first column
        function mergeTitleAndStepsRows(table, colspan_val) {
            const ingredient_cells = table.querySelectorAll("tbody tr > td:first-child");

            for (let i = 0; i < ingredient_cells.length; i++) {
                const currentIngred = ingredient_cells[i];
                const ingredText = currentIngred.textContent.trim();

                const isSpecialRow = ingredText.startsWith("---") && ingredText.endsWith("---");
                if (isSpecialRow) {
                    const tr = currentIngred.closest("tr");

                    // Hide other cells from that row (preserve DOM structure so column indexes remain stable)
                    const tds = tr.querySelectorAll("td");
                    for (let j = 1; j < tds.length; j++) {
                        tds[j].style.display = "none";
                    }

                    // set proper colspan on the first cell so the visual merge still works
                    currentIngred.setAttribute("colspan", colspan_val);

                }
            }
        }

        this.hide_percentage_columns_button.addEventListener('click', (event) => {
            const ingredients_table = document.querySelectorAll("table")[this.table_with_ingredients_pos_index];
            const total_cols = ingredients_table.querySelectorAll("thead th").length ||
                            ingredients_table.querySelectorAll("tbody tr:first-child td").length;
            const ingredients_table_trs = ingredients_table.querySelectorAll("tr");

            if (ingredients_table_trs.length === 0) {
                console.log("ERROR: your table doesn't contain 'tr' elements");
                return;
            }
            if (ingredients_table_trs[0].querySelector("th") === null) {
                console.log("ERROR: your table doesn't contain 'th' elements");
                return;
            }

            // 1. Get percentage columns
            const indices_to_toggle = [];
            const title_ths = ingredients_table_trs[0].querySelectorAll("th");
            let to_hide_cols_count = 0;

            for (let i = 0; i < title_ths.length; i++) {
                const th = title_ths[i];
                if (th.querySelector("div")?.textContent.includes("%") || th.querySelector("div")?.textContent.toLowerCase().includes("scale")) {
                    to_hide_cols_count++;
                    this.hide_percentage_columns_button.textContent = "Hide percentage columns";
                    indices_to_toggle.push(i);
                    const th_to_toggle = title_ths[i];

                    if (th_to_toggle.style.display.toLowerCase() !== "none") {
                        th_to_toggle.style.display = "none";
                        this.hide_percentage_columns_button.textContent = "Show percentage columns";
                    } else {
                        th_to_toggle.style.display = "table-cell";
                        this.hide_percentage_columns_button.textContent = "Hide percentage columns";
                    }
                }
            }

            // 2. Toggle cells
            for (let i = 1; i < ingredients_table_trs.length; i++) {
                const tr = ingredients_table_trs[i];
                const curr_tds = tr.querySelectorAll("td");
                indices_to_toggle.forEach(idx => {
                    const curr_td_to_toggle = curr_tds[idx];
                    if (!curr_td_to_toggle) return;

                    if (curr_td_to_toggle.style.display.toLowerCase() !== "none") {
                        curr_td_to_toggle.style.display = "none";
                    } else {
                        curr_td_to_toggle.style.display = "table-cell";
                    }
                });
            }

            // 3. Run merge ONCE after toggling
            // detect whether columns are currently hidden or shown
            let anyHidden = false;
            for (let i = 0; i < indices_to_toggle.length; i++) {
                const idx = indices_to_toggle[i];
                const th = title_ths[idx];
                if (th.style.display.toLowerCase() === "none") {
                    anyHidden = true;
                    break;
                }
            }

            // adjust colspan depending on state
            const current_colspan = anyHidden
                ? total_cols - to_hide_cols_count       // hiding
                : total_cols;                         // showing

            mergeTitleAndStepsRows(ingredients_table, current_colspan);

        });
    }

    addNonActiveTabsButtonListener(tab) {
        if(!tab.listenerAdded)
            tab.addEventListener('click', (event) => {
                // Your function here
                console.log('addNonActiveTabsButtonListener()');
                this.deconstructor();   
                
                setTimeout(() => {
                    this.RecipeScaler();
                }, 500);

                tab.listenerAdded = true;
            });
    }

    calculate_button_positions() {
        // function acts under assumption that each and every recipe page has only 5 buttons (h6) and only two tables
        const all_opened_tabs = document.querySelectorAll(".workspace-tabs.mod-top.mod-top-right-space.mod-active .workspace-tab-header-container .workspace-tab-header.tappable.is-active.mod-active, .workspace-tabs.mod-top.mod-top-right-space.mod-active .workspace-tab-header-container .workspace-tab-header.tappable");

        // Find the index of the active tab within the open tabs
        let activeTabIndex = -1;
        let start_from = -1;
        let first_table_idx = -1;
        all_opened_tabs.forEach((tab, index) => {
            if (tab.classList.contains("is-active")) {
                activeTabIndex = index;
            }
        });

        if(activeTabIndex==0) {
            start_from = 0;
            first_table_idx = 0;
        } else if(activeTabIndex==1) {
            start_from=RecipeScaler.AMOUNT_OF_BUTTONS_PER_PAGE; // 5 is qty of buttons
            first_table_idx = RecipeScaler.AMOUNT_OF_TABLES_PER_PAGE; // 2 is qty of tables here
        } else {
            start_from = RecipeScaler.AMOUNT_OF_BUTTONS_PER_PAGE*(activeTabIndex-1)+RecipeScaler.AMOUNT_OF_BUTTONS_PER_PAGE; // 5 is qty of buttons
            first_table_idx = activeTabIndex*RecipeScaler.AMOUNT_OF_TABLES_PER_PAGE; // 2 is qty of tables here
        }

        // console.log("Your buttons must start from the ", start_from, " index");
        // console.log("Your tables must start from the ", first_table_idx, " index");
        return [first_table_idx, start_from];
    }

    add_new_col_to_table(table, idx_to_insert_column_into, col_text) {
        console.log("Creating column...");
        const tableHeader = table.querySelector("thead");

        if (tableHeader) {
            const headerRow = tableHeader.querySelector("tr");
            if (headerRow) {
                const newHeaderCell = document.createElement("th");
                newHeaderCell.innerHTML = `<div class='table-cell-wrapper'>${col_text}</div>`;  // Set the header cell text
                headerRow.insertBefore(newHeaderCell, headerRow.children[idx_to_insert_column_into]);
            }
        }

        // Add a new cell to each row in the table body (tbody) at the specified index
        const tableBody = table.querySelector("tbody");
        if (tableBody) {
            const rows = tableBody.querySelectorAll("tr");
            rows.forEach(row => {
                const newCell = document.createElement("td");
                newCell.innerHTML = "<div class='table-cell-wrapper bold-aqua'></div>"; // Initialize new cell with empty content
                row.insertBefore(newCell, row.children[idx_to_insert_column_into]);
            });
        }

        return idx_to_insert_column_into;
    }

    // Adds a listener to the scaling button to adjust ingredient quantities based on user input
    addScaleIngredientsButtonListener() {
        this.scaleIngredients_button.addEventListener('click', (event) => {
            console.log(RecipeScaler.intervals);
            console.log(`The scale value is ${this.getScaleIngredientsValue()}`);
            console.log(`this.table_with_ingredients_pos_index = ${this.table_with_ingredients_pos_index}`);
            const ingredients_table = document.querySelectorAll("table")[this.table_with_ingredients_pos_index];
            const ingredients_table_ths = ingredients_table.querySelectorAll("th");
            
            // Get the column indices
            // Get the column indices
            let [ingredients_col_pos_idx, quantity_col_pos_idx, percentage_col_pos_idx, bakers_percentage_col_pos_idx, note_col_pos_idx, scaled_col_idx] = this.get_column_indices(ingredients_table_ths);
            let scale_value = this.getScaleIngredientsValue();
            let new_column_idx = scaled_col_idx;

            // If scaled column doesn't exist, add it
            if (scaled_col_idx === false || scaled_col_idx === undefined) {
                // Insert after quantity column
                new_column_idx = this.add_new_col_to_table(ingredients_table, quantity_col_pos_idx + 1, "Scaled <strong>x" + scale_value + "</strong>");
                // respect hide/show state of percentage columns (button text contains "show" when currently hidden)
                if (this.hide_percentage_columns_button.textContent.toLowerCase().includes("show")) {
                    RecipeScaler.hide_tables_col(ingredients_table, new_column_idx + 1, true);
                } else {
                    RecipeScaler.hide_tables_col(ingredients_table, new_column_idx + 1, false);
                }
            } else {
                // scaled column exists — update the header consistently
                const scaledTh = ingredients_table_ths[scaled_col_idx];
                if (scaledTh) {
                    // ensure the full header has the "Scaled " label and the strong xN markup
                    scaledTh.innerHTML = `<div class='table-cell-wrapper'>Scaled <strong>x${scale_value}</strong></div>`;
                }
                new_column_idx = scaled_col_idx;
            }


            // Iterate through each row in tbody to scale values
            const ingredients_table_tbody_trs = ingredients_table.querySelectorAll("tbody tr");
            ingredients_table_tbody_trs.forEach((tr) => {
                // Get the initial quantity and scale it
                // const ingredient_title_lower = tr.querySelectorAll('td')[ingredients_col_pos_idx]?.querySelector('div').textContent.toLowerCase();
                const initial_amount_el = tr.querySelectorAll('td')[quantity_col_pos_idx]?.querySelector('div');
                const scaled_td = tr.querySelectorAll('td')[new_column_idx];

                if (!initial_amount_el || !scaled_td) return; // Skip if elements are missing
            
                const curr_initial_amount = initial_amount_el.textContent;
                let new_amount = isNaN(curr_initial_amount) || curr_initial_amount === "" ? "" : RecipeScaler.round(parseFloat(curr_initial_amount) * scale_value, 1);
            
                // Set the scaled amount in the new column's cell, ensuring `div` exists
                let scaled_div = scaled_td.querySelector('div');
                if (!scaled_div) {
                    scaled_div = document.createElement("div");
                    scaled_td.appendChild(scaled_div);
                }
                scaled_div.innerHTML = new_amount;
            });

            this.calculate_percentages(ingredients_table_tbody_trs, ingredients_col_pos_idx, quantity_col_pos_idx, scaled_col_idx, percentage_col_pos_idx, bakers_percentage_col_pos_idx, new_column_idx, scale_value);
            
        });
    }

    get_column_indices(table_ths) {
        let ingredients_col_pos_idx=false, quantity_col_pos_idx=false, percentage_col_pos_idx=false, bakers_percentage_col_pos_idx=false, note_col_pos_idx=false, scaled_col_dx = false;

        table_ths.forEach((th, index) => {
            const lowerText = th.textContent.toLowerCase();
            //console.log(lowerText);
            if (lowerText.includes(RecipeScaler.ING_TBL_INGREDIENTS_COL)) {
                ingredients_col_pos_idx = index;
            } else if (lowerText.includes(RecipeScaler.ING_TBL_QUANTITY_COL)) {
                quantity_col_pos_idx = index;
            } else if (lowerText.includes(RecipeScaler.ING_TBL_BAKERS_PERCENTAGE_COL)) {
                bakers_percentage_col_pos_idx = index;
            } else if (lowerText.includes(RecipeScaler.ING_TBL_NOTE_COL)) {
                note_col_pos_idx = index;
            } else if (lowerText.includes(RecipeScaler.ING_TBL_SCALED_COL)) {
                scaled_col_dx = index;
            } else if (lowerText == RecipeScaler.ING_TBL_PERCENTAGE_COL) {
                percentage_col_pos_idx = index;
            }
        });

        return [ingredients_col_pos_idx, quantity_col_pos_idx, percentage_col_pos_idx, bakers_percentage_col_pos_idx, note_col_pos_idx, scaled_col_dx];
    }

    // assumes that table has a head with th elements and a body with trs
    static hide_tables_col(table, column_idx, flag_is_to_hide) {
        let status = "table-cell";
        
        if(flag_is_to_hide)
            status = "none";
        
        const table_trs = table.querySelectorAll("tr");

        for (let i = 0; i < table_trs.length; i++) {
            const curr_trs = table_trs[i];
            //console.log(curr_trs);
            let el_to_hide = null;

            if(i==0) {
                el_to_hide = curr_trs.querySelector(`th:nth-child(${column_idx})`);
            } else {
                el_to_hide = curr_trs.querySelector(`td:nth-child(${column_idx})`);
            }
            
            //console.log(el_to_hide)

            if(el_to_hide)
                el_to_hide.style.display = status;
        }
    }

    static round(num, decimals) {
        var n = Math.pow(10, decimals);

        return Math.round((n * num).toFixed(decimals)) / n;
    };

    calculate_percentages(
        table_rows,
        ingredients_col_pos_idx,
        quantity_col_pos_idx,
        scaled_col_idx,
        percentage_col_pos_idx,
        bakers_percentage_col_pos_idx,
        new_column_idx,
        scale_value
    ) {

        function render_dough_hydration(dough_hydration_val) {
            let counter = 0;
            table_rows.forEach(tr_s => {
                const ingredient_title_lower =
                    tr_s.querySelectorAll('td')[ingredients_col_pos_idx]
                        ?.querySelector('div')?.textContent.toLowerCase();

                if (ingredient_title_lower?.contains(RecipeScaler.OVERALL_HYDRATION_ROW)) {
                    counter++;
                    if (counter === ingredients_tables.length) {
                        const ingredient_qty_el =
                            tr_s.querySelectorAll('td')[quantity_col_pos_idx]?.querySelector('div');
                        const ingredient_scaled_qty_el =
                            tr_s.querySelectorAll('td')[new_column_idx]?.querySelector('div');

                        ingredient_qty_el.innerHTML =
                            "<strong>" + RecipeScaler.round(dough_hydration_val, 3) + "%</strong>";
                        ingredient_scaled_qty_el.innerHTML =
                            "<strong>" + RecipeScaler.round(dough_hydration_val, 3) + "%</strong>";
                    }
                }
            });
        }

        if (scaled_col_idx === false || scaled_col_idx === undefined) {
            if (bakers_percentage_col_pos_idx) bakers_percentage_col_pos_idx += 1;
            if (percentage_col_pos_idx) percentage_col_pos_idx += 1;
        }

        let ingredients_tables = [];

        let sourdough = null;
        let rows_indexes = [];
        let ingr_labels_lower = [];
        let ingr_quanties = [];

        let flour_weight = 0;
        let water_weight = 0;

        table_rows.forEach((tr, idx) => {

            const ingredient_title_lower =
                tr.querySelectorAll('td')[ingredients_col_pos_idx]
                    ?.querySelector('div')?.textContent.toLowerCase();

            if (!ingredient_title_lower) return;

            if (ingredient_title_lower.contains("---") || ingredient_title_lower.contains("--"))
                return;

            const ingredient_qty_el =
                tr.querySelectorAll('td')[quantity_col_pos_idx]?.querySelector('div');
            const ingredient_scaled_qty_el =
                tr.querySelectorAll('td')[new_column_idx]?.querySelector('div');

            const ingredient_qty = parseFloat(ingredient_qty_el?.textContent) || 0;

            const is_overall_row =
                ingredient_title_lower.contains(RecipeScaler.OVERALL_WEIGHT_ROW);

            /* ---------------- SOURDOUGH ---------------- */
            if (ingredient_title_lower.contains("sourdough")) {

                const hydration_match =
                    ingredient_title_lower.match(/(\d+(?:\.\d+)?)\s*%/);

                const hydration =
                    ingredient_title_lower.contains("dried")
                        ? 0
                        : (hydration_match ? parseFloat(hydration_match[1]) : 0);

                sourdough = {
                    hydration: hydration,
                    weight: ingredient_qty
                };

                rows_indexes.push(idx);
                ingr_labels_lower.push(ingredient_title_lower);
                ingr_quanties.push(ingredient_qty);
                return;
            }

            /* ---------------- FLOUR ---------------- */
            if (RecipeScaler.ING_TBL_FLOUR_KEYS.some(val => ingredient_title_lower.contains(val))) {
                flour_weight += ingredient_qty;
                console.log("flour weight after considering", ingredient_title_lower, "=", flour_weight);
            }

            /* ---------------- WATER ---------------- */
            const matchingKey =
                Object.keys(RecipeScaler.ING_TBL_WATER_KEYS)
                    .find(val => ingredient_title_lower.contains(val));

            if (matchingKey) {
                const waterPercentage = RecipeScaler.ING_TBL_WATER_KEYS[matchingKey] / 100;
                water_weight += ingredient_qty * waterPercentage;
                console.log("water weight after considering", ingredient_title_lower, "=", water_weight);
            }

            if (
                !ingredient_title_lower.contains(RecipeScaler.OVERALL_WEIGHT_ROW) &&
                !ingredient_title_lower.contains(RecipeScaler.OVERALL_HYDRATION_ROW)
            ) {
                rows_indexes.push(idx);
                ingr_labels_lower.push(ingredient_title_lower);
                ingr_quanties.push(ingredient_qty);
            }

            /* ---------------- SECTION END ---------------- */
            if (is_overall_row) {

                let levain_flour_amount = 0;
                let levain_water_amount = 0;

                if (sourdough && sourdough.hydration !== 0) {
                    levain_flour_amount =
                        sourdough.weight / (1 + sourdough.hydration / 100);
                    levain_water_amount =
                        sourdough.weight - levain_flour_amount;

                    flour_weight += levain_flour_amount;
                    water_weight += levain_water_amount;

                    console.log("Flour weight after considering levain =", flour_weight);
                    console.log("Water weight after considering levain =", water_weight);
                }

                const overall_weight =
                    ingr_quanties.reduce((a, b) => a + b, 0);

                const dough_hydration =
                    flour_weight > 0 ? (water_weight / flour_weight) * 100 : 0;

                ingredients_tables.push({
                    rows_indexes: rows_indexes,
                    ingr_labels_lower: ingr_labels_lower,
                    ingr_quanties: ingr_quanties,
                    percentages: ingr_quanties.map(q => q / overall_weight),
                    bakers_percentages: ingr_labels_lower.map((lbl, i) => {
                        if (lbl.contains("sourdough") && sourdough) {
                            return levain_flour_amount / flour_weight;
                        }
                        return ingr_quanties[i] / flour_weight;
                    }),
                    hydration: dough_hydration,
                    flour_weight: flour_weight
                });

                render_dough_hydration(dough_hydration);

                ingredient_qty_el.innerHTML =
                    "<strong>" + RecipeScaler.round(overall_weight, RecipeScaler.ING_TBL_DECIMALS) + "</strong>";
                ingredient_scaled_qty_el.innerHTML =
                    "<strong>" + RecipeScaler.round(overall_weight * scale_value, RecipeScaler.ING_TBL_DECIMALS) + "</strong>";

                sourdough = null;
                rows_indexes = [];
                ingr_labels_lower = [];
                ingr_quanties = [];
                flour_weight = 0;
                water_weight = 0;
            }
        });

        ingredients_tables.forEach(table => {
            for (let i = 0; i < table.rows_indexes.length; i++) {
                const row_index = table.rows_indexes[i];

                if (percentage_col_pos_idx) {
                    const el =
                        table_rows[row_index]
                            .querySelectorAll('td')[percentage_col_pos_idx]
                            ?.querySelector('div');

                    if (el && table.percentages[i]) {
                        el.innerHTML =
                            RecipeScaler.round(table.percentages[i] * 100, RecipeScaler.ING_TBL_DECIMALS) + "%";
                    }
                }

                if (bakers_percentage_col_pos_idx) {
                    const el =
                        table_rows[row_index]
                            .querySelectorAll('td')[bakers_percentage_col_pos_idx]
                            ?.querySelector('div');

                    if (el && table.bakers_percentages[i]) {
                        el.innerHTML =
                            RecipeScaler.round(table.bakers_percentages[i] * 100, RecipeScaler.ING_TBL_DECIMALS) + "%";
                    }
                }
            }
        });
    }

    

    static clearAllIntervals() {
        RecipeScaler.intervals.forEach(interval_id => {
            clearInterval(interval_id);
        });

        RecipeScaler.intervals = [];
    }

    deconstructor() {
        RecipeScaler.clearAllIntervals();
    
        // Remove event listeners
        if (this.scaleIngredients_button) {
            this.scaleIngredients_button.removeEventListener('click', this.addScaleIngredientsButtonListener);
        }
    
        if (this.non_active_tabs) {
            this.non_active_tabs.forEach(tab => {
                tab.removeEventListener('click', this.deconstructor.bind(this));
            });
        }

        if (this.tree_structure_files) {
            this.tree_structure_files.forEach(file => {
                file.removeEventListener('click', this.deconstructor.bind(this));
            });
        }

        this.calculate_pecentages_button = null;
        this.close_a_tab_buttons = [];

        this.scaleIngredientsValue_container = null;
        this.scaleIngredients_button = null;

        console.log("Cleanup complete");
    }
    
}