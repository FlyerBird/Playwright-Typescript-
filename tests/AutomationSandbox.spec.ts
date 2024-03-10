import { test, Browser, Page, expect} from '@playwright/test';
import { SandboxPage } from './Pages/SanboxPage';
import exp from 'constants';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀☻';

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Botón ID Dinámico', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            //await test.step('Puedo hacer click en el botón dinámico', async () => {
                //await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click({force: true});
            
                await test.step('Otra menera de Puedo hacer click en el botón dinámico', async () => {
                    const botonIDDinamico = await page.getByRole('button', { name: 'Hacé click para generar un ID' });
                    await botonIDDinamico.click({force: true});
                    await expect (page.getByText('OMG, aparezco después de 3')).toBeVisible();
            })
              
        })
        
        test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await expect( page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                await expect( page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toHaveValue(textoAEscribir);
            })
        })

        test('Puedo seleccionar checkboxes y deseleccionar un checkbox en el Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar checkboxes', async () => {
                const sandbox = new SandboxPage(page);
                //await page.getByLabel('Pasta 🍝').check();
                await sandbox.checkPasta();
                
                await expect(sandbox.pastaCheckbox, 'aquí puedo poner comentarios descriptivos 😊').toBeChecked();
            })

            await test.step('Puedo deseleccionar checkboxes', async () => {
                await page.getByLabel('Pasta 🍝').uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
            })
        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el radioButton para No', async () => {
                await page.getByLabel('No').check();
                await expect(page.getByLabel('No'), 'El radio button se seleccionó').toBeChecked();
            })
        })

        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Futebol', 'Tennis', 'Basketball']

                for(let opcion of deportes) {
                    const elemento = await page.$('select#formBasicSelect > option:is(:text("${opcion}"))')
                    if(elemento){
                        console.log(`La opción '${opcion}' está presente`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente`);
                    }
                }
            })
        })

        test('Valido la columna Nombres de la tabla estática', async ({page}) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
            
        })

          test('Valido que todos los valores cambian de la tabla dinámica después de un reload', async ({page}) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos una array con todos los valores de la tabla dinámica
                const valoresTabaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTabaDinamica);

                //Hacemos una recarfa para que cambien los valores
                await page.reload();

                //Creamos una segunta array con los valores después de la recarga
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);

                //Validamos que todos los valores cambiaron para cada celda.
                expect(valoresTabaDinamica).not.toEqual(valoresPostReload);
            })
            
        })

        test('Ejemplo de Soft Asertions', async ({page}) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que todos los elemetos de las checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕')).toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔')).toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝')).toBeVisible();
                await expect.soft(page.getByText('Helado 🍧')).toBeVisible();
                await expect.soft(page.getByText('Torta 🍰')).toBeVisible();
            })
            
        })
        

        test('Puedo seleccionar un dia de la semana del Dropdown', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Selecciono un dia de la semana del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Martes' }).click();
            })
        })

        test('Validando dentro de un popup', async ({ page }) => {
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
 
            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
 
            })
 
 
        })


    })
    
})();