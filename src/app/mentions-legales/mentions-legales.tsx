export default function MentionsLegales() {
    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>

            <section>
                <h2 className="text-xl font-semibold mt-4">1. Éditeur du site</h2>
                <p>Nom de l&apos;entreprise : <strong>JH Studio Code</strong></p>
                <p>Statut juridique : Micro-entreprise</p>
                <p>Adresse : (Adresse communiquée à l&apos;hébergeur, sur demande légale uniquement)</p>
                <p>Email : juliennehattabi@outlook.com</p>
                <p>SIRET : 938 178 894 00011</p>
                <p>Responsable du contenu : HASMUJAJ Ervin</p>
                
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">2. Hébergeur du site</h2>
                <p>Le site est hébergé par :</p>
                <p><strong>Vercel Inc.</strong></p>
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789, États-Unis</p>
                <p>Site web : <a href="https://vercel.com" target="_blank" className="text-blue-600 underline">https://vercel.com</a></p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">3. Propriété intellectuelle</h2>
                <p>L’ensemble des contenus du site (textes, images, logos…) est la propriété exclusive de H.C.R, sauf mention contraire.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">4. Protection des données personnelles</h2>
                <p>Ce site ne collecte aucune donnée personnelle.</p>
            </section>

        

            <section>
                <h2 className="text-xl font-semibold mt-4">5. Droit applicable</h2>
                <p>Le présent site est soumis à la législation française.</p>
            </section>


        </main>
    );
}