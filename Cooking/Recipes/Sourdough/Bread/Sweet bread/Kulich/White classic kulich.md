```dataviewjs
while (!customJS?.state?._ready) { 
	await new Promise(resolve => setTimeout(resolve, 50)); 
} 

const {RecipeScaler} = await cJS();
RecipeScaler.RecipeScaler();

window.onerror = function (message, source, lineno, colno, error) {
	if (error instanceof TypeError && message.includes("Cannot read properties of undefined")) {
		RecipeScaler.RecipeScaler();
		return true;
	}
    };
```


| 1                                                                                                                                                                                                                                                                  | 2                                                                                                                                                                                                                                    | 3                                                                                                                                                                                                                                    | 4                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://lh3.googleusercontent.com/pw/AP1GczO4AmGYQZ4Tv9fSanJJjbwAKtsEmZ1TVaTpH9PmsVhWPTuEfZX1LcP2vaS648MwN1JNfKjqPq_7ZR6x-pTL1wbqE0tc9Qw9_fy13C5-_jAN4UcdCuHkHRn9WMUK4MnFGaJvkKm94-gJ6OWaLNLv4cFb=w709-h903-s-no-gm?authuser=0)                                | ![](https://lh3.googleusercontent.com/pw/AP1GczOmOZ8ANByPtFvwkUrOCYRbNpapwAVpGhx7IOvQI9XJeXkEPXN1UHGJ-QdHeNDWRdz4P3qx1cKtMEEwz_A5lBY7w3Bo-KzJ099xz-8KUvYKmkWoovATnUUcTiA7egvBN0BMhiI2pPC-dwmvN-7nh1LQ=w876-h903-s-no-gm?authuser=0)  | ![](https://lh3.googleusercontent.com/pw/AP1GczOiuRab8pqW7hr9dbzQ6MHuhyuPn_D_sda9lopiCL2d4l7M1wvhqm6p8m6HMzcGS9gTOztDUfApdNNCzVk6Ny847PrDdSDK1jAWGcfzzfWPtyWYyeLuu1n2N8GK57F0RyLb91U3VxTk108nh6I584xq=w677-h903-s-no-gm?authuser=0)  | ![](https://lh3.googleusercontent.com/pw/AP1GczMsvWmQgAMkTKtimOudkUmStR8IGvldYPUrjPVBcS4a0ErZrvOHAMlPqud_CRSlFJLqo3Xh6OLoRv8J5M_ehZ5TJq3wYSsMi0Tk4_VChPIMuT9k3p7RAtPP1A_ZIHYRLXIskuEMzbevP1Z_3kZNpgVi=w718-h903-s-no-gm?authuser=0) |
| ![](https://lh3.googleusercontent.com/pw/AP1GczOtrraeFw1uRETRG90j4RQFJ5mvXwC4dTQfRJBpgpnpIGvZ_5t18wAQcT6YxFlNaYVft_RB03XsaBTCQfXmNErK4qtlvW2oKeSU8XUORUly5HEqRYDXbdstQ7Chdw-fO58iprWjvO5CdZkjdBEzGnnS=w1204-h903-s-no-gm?authuser=0)                               | ![](https://lh3.googleusercontent.com/pw/AP1GczOhzO52ZXZe5y3wWwHPs92CquosEs_sGGKVvMdIBOi41qtVZMkJTGzYdgOPOLTxBDLrXrhRDPc2zm0gBZxq-Bcc5401aRZo6zWiYONOQo6vr7dgFQx5OtBrqFZiSTtMDABmdS4ZVhVsr_LG7lFk1lbl=w1204-h903-s-no-gm?authuser=0) | ![](https://lh3.googleusercontent.com/pw/AP1GczMBdTFWR0vuKfkGU9hj8V6QKvrWtS4e7QoPTX_LyU96s3jYkq7MfHGaw3c6Sy1bOnj7_TN2a2P6HXmSV20rW-jpnERD4aAslBNcYF5YrNaX62yOy60H-KSmOeleN-xH_AIV2ELGi732sdgW5eEKcZTu=w1204-h903-s-no-gm?authuser=0) | ![](https://lh3.googleusercontent.com/pw/AP1GczOclPaRVmq8gsgz4thwQyUBWkOGoCgXl5K6NLCJvoGi_-zod4Asox87Bd3wNaSgvh7PnfzmWdT4z701vGhdBl-spFraTp3WX9Rz6hiX02mE0E03ks9oZA_Mrq6zw_z3abnNOeq-CC8el78po-AS1F_Z=w677-h903-s-no-gm?authuser=0) |
| ![](https://lh3.googleusercontent.com/pw/AP1GczO6auoAqnNDCOf_w-BSIVKTBZV5juQZccYz0EA9wRPxzYrHtohpS02i5z_9P1WKnF88kH85QhjGOMrzez04OMcTkajHaTQ4EXZ_t_39HGPTrErTXeIPWOI-YxUbSGmhQhkgVzqd8ZEQDwTlr9moz_lx=w1204-h903-s-no-gm?authuser=0)                               | ![](https://lh3.googleusercontent.com/pw/AP1GczMqdiaRIDINHS7hvQDauR_alPJvbZBQ50SVx90_ztxZNN6lftB7ugSQCvsBczbcqNBnLiwSb7hwNsj8cVdvONgEroxDMRkA4nR42j66xigoEkOzC4MipnA3eGBUoAwBIHVctZumnUc3-U6yop1qh2i8=w1204-h903-s-no-gm?authuser=0) | ![](https://lh3.googleusercontent.com/pw/AP1GczNABSt3_CSTb441DrxrHk7VQC20QwO3TKKceTq6S8pyYsteDaXIRet_g4y4FCDmqviYUQw2sGqULNUg_rxTmV089IJA7HnawL_2wuFkq9J6dDQE3SKMiywxXOuHPLqr8TO6QEnSYwxURKiTlBs5u4ik=w677-h903-s-no-gm?authuser=0)  |                                                                                                                                                                                                                                     |
| Baked 2 batched here:<br>- 2-3cm below the rim -> the dough burst and shifted -> definitely underproofed<br>- ~2cm above the rim -> slightly overproofed                                                                                                           |                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                     |
| For the next time:<br>- wait for the optimum: wait, until the dough is at the rim's level or a bit under (the dome) and start preheating the oven<br>- do not proof your Kulich in the hot oven, they rise and ferment unevenly because of the top heating element | Dough alterations:<br>Milk 24.4% -> 21.2%<br>Milk 2 2.9% -> 2.4%<br>Honey 8.8% ->10%                                                                                                                                                 |                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                     |
| First dough bulk: 8h<br>Second dough bulk (from the fridge): 9h and ~11h respectively                                                                                                                                                                              |                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                     |



## Ingredients

###### 1
###### Scale
###### 520 * 6 = 3120
###### Calculate
###### Unreleased 3

| Ingredient                                                                                                                            | Quantity, g | Baker's % | %   | Note                                 |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------- | --- | ------------------------------------ |
| **My white version; classic** (yield 6 molds x 520-535g)                                                                              |             |           |     |                                      |
| [[Sourdough starter types\|Sourdough starter (50%)]]                                                                                  | 368         |           |     |                                      |
| [[Flours\|Bread flour (Zernari) / any 00 flour]]                                                                                      | 784         |           |     |                                      |
| [[Flours\|Wheat flour (HH Manitoba)]]                                                                                                 | 243         |           |     |                                      |
| Milk                                                                                                                                  | 270         |           |     |                                      |
| Egg yolks                                                                                                                             | 180         |           |     | 9 pcs. (175-180g)                    |
| Eggs                                                                                                                                  | 150         |           |     | 3 pc.                                |
| Sugar                                                                                                                                 | 240         |           |     |                                      |
| Vanilla extract                                                                                                                       |             |           |     |                                      |
| [[Inverted sugar]] / honey                                                                                                            | 127         |           |     |                                      |
| Butter; softened                                                                                                                      | 243         |           |     |                                      |
| Sea salt                                                                                                                              | 19          |           |     |                                      |
| Milk 2 (if needed)                                                                                                                    | 30          |           |     |                                      |
| Raisins/any dry fruit; soaked                                                                                                         | 400         |           |     | 150g cranberries + 250g raisins used |
|                                                                                                                                       |             |           |     |                                      |
| **Overall hydration**                                                                                                                 |             |           |     |                                      |
| **Overall weight**                                                                                                                    |             |           |     |                                      |
|                                                                                                                                       |             |           |     |                                      |
|                                                                                                                                       |             |           |     |                                      |
|                                                                                                                                       |             |           |     |                                      |
|                                                                                                                                       |             |           |     |                                      |
| [[Glazes and meringues\|Swiss meringue]]                                                                                              | 400         |           |     |                                      |
| • 120 g egg whites (~4 egg whites)<br>• 216 g sugar (ratio sugar : egg whites = 1.8)<br>• 1/4 tsp. salt<br>• lemon juice<br>• vanilla |             |           |     |                                      |
|                                                                                                                                       |             |           |     |                                      |
| **Overall weight**                                                                                                                    |             |           |     |                                      |









---
## Directions:

Day 1:
**10:00 a.m.** Feed LM: 12g LM : 20g **water** : 40g white flour **at room temp**
**10:00 p.m.-12:00 p.m.** Feed LM: 72g LM (50%): 100g **water** : 200g white flour **at 25-26C** for 12 hours, when it's fully expanded, not growing anymore and bubbly all over


---
### **Recommended Mixing Method (Stand Mixer, Dough Hook)**

1. **Preliminary Prep:**
    - Soak your dried fruit in warm water and rum well in advance. (10-15% rum + 85-90% rum).
    - Bring **butter** to ~15–18°C (cool and pliable).
    - Have your **levain** at its peak, nicely domed and active.
    - Separate the eggs (12 pcs.) into 3 cups. Egg yolks (9), egg whites (9), eggs (3).
2. **Autolyze Base Dough (optional but recommended):**
    - Whisk **all eggs + all yolks** + **half the sugar**.
    - Add **the milk**, mix.
    - Add **all flours**, combine into a dough in a stand mixer until just combined. Let rest for **20-30 minutes**; covered. This hydrates the flour, kick-starts gluten, and makes later mixing smoother.
    - Wash the hook, put it into the freezer.
    - Measure **the milk2** into a small cup, put in the fridge.
    - Drain the dry fruit, leave on the colander to rest. May put them into the fridge, if it's too hot.
3. **Add Levain:**
    - Add the ripe **sourdough starter**.
    - Mix on low speed for **3–5 minutes**, then medium for another **3–5 minutes**.
    - You want visible gluten structure beginning to form. Almost passes windowpane.
4. **Add Remaining Sugar and the flavorings (second half):**
    - Add in **the remaining sugar**, **honey/inverted sugar**, and **vanilla**.
    - Regain the consistency.
5. **Add Salt:**
    - Add **salt** with **1/3 of the milk from the fridge**.
    - Mix until incorporated and passes windowpane.
6. **Add Butter in Chunks:**
    - Add softened, cool butter in **5–6 additions**, waiting for full incorporation each time.
    - Scrape down sides as needed. Dough will slacken at first, then tighten again.
    - Mix until glossy, elastic, and passes the **windowpane test**.
7. **Add a bit more milk** to soften the dough:
	- If the dough can handle, add **1/3 more milk from the fridge**. 
	- Regain the consistency.
8. **Add Fruit:**
    - Pat dry the fruit briefly, add them all at once.
    - Knead a few minutes on low evenly distributed and the consistency's regained.
9. **Add the remaining milk**:
	- If the dough is super strong and stiff-ish (although soft), add **the remaining milk from the fridge** while kneading, very slowly.
	- Regain the consistency. It should slightly "kiss" the sides of the mixing bowl, sticking occasionally. If it can handle more milk, add it.
10. **Check Dough Temp:**
    - Ideally ends around **24–26°C**. If higher, refrigerate 15 min before bulk.
    - Measure the dough's weight and [[How much dough goes into the mold|calculate]] for the molds.


---
## Nutrition Facts:

| **Servings:**          |     | % Daily Value |
| ---------------------- | --- | ------------- |
| **Amount per serving** |     |               |
| **Calories**:          |     |               |
|                        |     |               |
| **Total Fat**          |     |               |
| **Saturated Fat**      |     |               |
| **Cholesterol**        |     |               |
| **Sodium**             |     |               |
| **Total Carbohydrate** |     |               |
| **Dietary Fiber**      |     |               |
| **Total Sugars**       |     |               |
| **Protein**            |     |               |
| **Vitamin D**          |     |               |
| **Calcium**            |     |               |
| **Iron**               |     |               |
| **Potassium**          |     |               |

---
## History:

| Banneton | Scoring | Appearance | Crumb |
| -------- | ------- | ---------- | ----- |
|          |         |            |       |
|          |         |            |       |

---
## Notes

> H

---



