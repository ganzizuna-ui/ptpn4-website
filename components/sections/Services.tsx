import { readData } from "@/lib/db";
import { getIcon } from "@/lib/icon-map";
import type { Service } from "@/lib/types";

export default async function Services() {
  const services = await readData<Service>("services.json");

  return (
    <section id="layanan" className="py-16 sm:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            Layanan Kami
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
            Bidang Usaha Unggulan
          </h2>
          <p className="mt-4 text-zinc-600">
            Kami mengelola berbagai lini usaha perkebunan dengan standar
            kualitas dan keberlanjutan tinggi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                className="group p-6 sm:p-8 rounded-2xl border border-zinc-200 hover:border-brand-700 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-5 group-hover:bg-brand-900 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-zinc-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
