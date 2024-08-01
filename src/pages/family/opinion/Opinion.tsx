import Score from "../score/Score";

export default function Opinion() {
  return (
    <div>
      <div className="bg-neutral-100 p-4 rounded">
        <h3 className="font-bold text-xl mb-4">Avis des hôtes précédents</h3>
        <div className="flex mb-4 items-center">
          <div className="size-10 rounded-3xl bg-primary" />
          <div className="ml-4">
            <p className="font-bold">Une famille recommandée à 100%</p>
            <div className="flex gap-x-2">
              <span className="flex">
                <Score />
              </span>
              <p>Max</p>
              <p>Le 26 Juillet 2024</p>
            </div>
          </div>
        </div>
        <p>
          Notre fils revient d'un séjour de 15 jours chez XXX et XXX et il est
          ravi ! En plus des nombreuses activités réalisées, il a été acueilli
          chaleureusement et avec beaucoup de gentillesse et de bienveillance.
          Une famille très investie au quotidien qui n'hésite pas à envoyer des
          nouvelles et des photos presque tous les jours. De quoi être rassuré
          pour les parents ! Un grand merci pour tout à la famille XXX. !
        </p>
        <div className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      </div>
    </div>
  );
}
