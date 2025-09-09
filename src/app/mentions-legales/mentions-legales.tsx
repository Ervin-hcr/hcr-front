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
                <p>
                    Site web :{" "}
                    <a href="https://vercel.com" target="_blank" className="text-blue-600 underline">
                        https://vercel.com
                    </a>
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">3. Propriété intellectuelle</h2>
                <p>
                    L’ensemble des contenus du site (textes, images, logos…) est la propriété exclusive
                    de H.C.R, sauf mention contraire.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">4. Protection des données personnelles</h2>
                <p>
                    Ce site vitrine collecte uniquement les données nécessaires lorsque vous nous
                    contactez (nom, email, téléphone). Ces informations servent exclusivement à
                    répondre à vos demandes et ne sont jamais transmises à des tiers à des fins
                    commerciales.
                </p>
                <p>
                    Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de
                    suppression de vos données en nous contactant à l’adresse suivante :{" "}
                    <a href="mailto:juliennehattabi@outlook.com" className="text-blue-600 underline">
                      hcr.amneville@gmail.com
                    </a>.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">5. Cookies</h2>
                <p>
                    Notre site utilise des cookies techniques nécessaires à son bon fonctionnement
                    (affichage, navigation). Ces cookies ne nécessitent pas de consentement préalable.
                </p>
                <p>
                    Nous utilisons également des services tiers tels que{" "}
                    <strong>Cloudinary</strong> pour l’hébergement et l’affichage de nos images. Ce
                    service peut déposer ses propres cookies, notamment à des fins analytiques ou
                    marketing. 
                </p>
                <p>
                    Lors de votre première visite, un bandeau vous permet d’accepter ou de refuser ces
                    cookies optionnels. Vous pouvez modifier votre choix à tout moment via les
                    paramètres de votre navigateur ou en vidant vos cookies.
                </p>
                <p>
                    Pour en savoir plus sur les cookies déposés par Cloudinary, consultez leur
                    politique de confidentialité :{" "}
                    <a
                        href="https://cloudinary.com/privacy"
                        target="_blank"
                        className="text-blue-600 underline"
                    >
                        https://cloudinary.com/privacy
                    </a>.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">6. Droit applicable</h2>
                <p>Le présent site est soumis à la législation française.</p>
            </section>
        </main>
    );
}
