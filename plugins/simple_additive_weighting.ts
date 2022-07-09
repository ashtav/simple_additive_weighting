type Data = {
    employees?: Array<any>;
    criteria?: Array<any>;
};

class SimpleAdditiveWeighting {

    run(data: Data, get_all_result = false) {
        try {

            // get data karyawan
            let employees = data.employees

            // ubah data dalam bentuk matriks keputusan X
            let matrix = [...employees.map(e => e.values)]

            // get nilai maksimal dalam matriks vertikal
            let max = matrix.reduce((r, a) => r.map((b, i) => Math.max(b, a[i])))

            // normalisasi matriks
            let normalize = []

            for (let i = 0; i < matrix.length; i++) {
                let results = []

                for (let j = 0; j < matrix[i].length; j++) {
                    let calc = matrix[i][j] / max[j]
                    results.push(calc)
                }

                normalize.push(results)
            }

            // get data kriteria
            let criteria = data.criteria

            // lakukan perhitungan
            let alternatives = []

            for (let i = 0; i < normalize.length; i++) {
                let results = []

                for (let j = 0; j < normalize[i].length; j++) {
                    let calc = normalize[i][j] * criteria[j].value
                    results.push(calc)
                }

                // jumlahkan hasil perkalian
                alternatives.push(results.reduce((a, b) => a + b))
            }

            // get nilai terbesar dalam array alternatives
            let max_alternatives = Math.max(...alternatives)

            // get index nilai terbesar dalam array alternatives
            let index = alternatives.indexOf(max_alternatives)

            let results = []

            alternatives.forEach((e, i) => {
                results.push({
                    'name': employees[i].name,
                    'value': e,
                    'index': i,
                    'criteria': normalize[i]
                })
            })

            // urutkan hasil berdasarkan nilai terbesar
            results.sort((a, b) => a.value > b.value ? -1 : 1)

            // return hasil perhitungan
            return get_all_result ? {
                top: {
                    name: results[0].name,
                    value: results[0].value
                },
                details: results,
                criteria: alternatives
            } : {
                name: employees[index].name,
                value: max_alternatives
            }
        } catch (error) {
            console.error('-- Error:', error)
        }
    }
}

const saw = new SimpleAdditiveWeighting()

export default defineNuxtPlugin(() => {
    return {
        provide: {
            simple_additive_weighting: saw.run,
        }
    }
})