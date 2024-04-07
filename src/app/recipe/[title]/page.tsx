import "./page.module.scss";

interface URLParams {
  params: { title: string }
}

export default function Recipe({params} : URLParams) {

  return (
    <main>
      Recipe {params.title}
    </main>
  );
}
