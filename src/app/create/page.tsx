"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { container } from "@/constants/styles";
import Section from "@/components/create/Section";
import ChainSelect from "@/components/create/ChainSelect";
import CollectionFields from "@/components/create/CollectionFields";
import ArtTypeSelector from "@/components/create/ArtTypeSelector";
import MintSettings from "@/components/create/MintSettings";
import MintStages from "@/components/create/MintStages";
import PublishBar from "@/components/create/PublishBar";
import CollectionGate, { GateCollection } from "@/components/create/CollectionGate";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

type Step = "gate" | "form";

export default function CreatePage() {
  const router = useRouter();
  const { address } = useAccount();
  const [step, setStep] = useState<Step>("gate");
  const [collections, setCollections] = useState<GateCollection[]>([]);
  const [chain, setChain] = useState("base");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [artType, setArtType] = useState<"same" | "unique">("same");
  const [priceEth, setPriceEth] = useState("0.00");
  const [royaltyPct, setRoyaltyPct] = useState("0");
  const [maxSupply, setMaxSupply] = useState("");
  const [perWallet, setPerWallet] = useState("1");
  const [startAt, setStartAt] = useState(() => new Date().toISOString().slice(0, 16));

  const stages = [
    {
      id: "public",
      name: "Public Mint",
      priceEth: priceEth === "0" || priceEth === "0.00" ? "0" : priceEth,
      start: new Date(startAt).toLocaleString(),
      free: priceEth === "0" || priceEth === "0.00",
      end: undefined,
    },
  ];

  const canPublish = name.trim().length > 0 && symbol.trim().length > 0;

  // Load existing collections (dummy) for the gate view
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ query: `query { collections { slug title } }` }),
        });
        const out = await res.json();
        setCollections((out.data?.collections || []).map((x: any) => ({ slug: x.slug, title: x.title })));
      } catch (e) {
        // ignore
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100 antialiased">
      <Navbar />
      <main className={`${container} pb-24`}>
        {step === "gate" ? (
          <CollectionGate
            collections={collections}
            onCreateNew={() => setStep("form")}
            onViewCollection={(slug) => router.push(`/mint/${slug}`)}
          />
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-6">Create Collection</h1>
            <div className="mt-6 grid grid-cols-1 gap-6">
              <Section title="Base Settings">
                <div className="grid grid-cols-1 gap-4">
                  <ChainSelect value={chain} onChange={setChain} />
                  <CollectionFields
                    name={name}
                    symbol={symbol}
                    description={description}
                    onChange={(p) => {
                      if (p.name !== undefined) setName(p.name);
                      if (p.symbol !== undefined) setSymbol(p.symbol);
                      if (p.description !== undefined) setDescription(p.description);
                    }}
                  />
                </div>
              </Section>

              <Section title="NFT Art Type">
                <ArtTypeSelector artType={artType} onChange={setArtType} />
              </Section>

              <Section title="Mint Settings">
                <MintSettings
                  priceEth={priceEth}
                  royaltyPct={royaltyPct}
                  maxSupply={maxSupply}
                  perWallet={perWallet}
                  startAt={startAt}
                  onChange={(p) => {
                    if (p.priceEth !== undefined) setPriceEth(p.priceEth);
                    if (p.royaltyPct !== undefined) setRoyaltyPct(p.royaltyPct);
                    if (p.maxSupply !== undefined) setMaxSupply(p.maxSupply);
                    if (p.perWallet !== undefined) setPerWallet(p.perWallet);
                    if (p.startAt !== undefined) setStartAt(p.startAt);
                  }}
                />
                <div className="mt-4">
                  <MintStages stages={stages} />
                </div>
              </Section>
            </div>
          </>
        )}
      </main>

      {step === "form" && (
        <PublishBar
          chainLabel={chain.charAt(0).toUpperCase() + chain.slice(1)}
          disabled={!canPublish}
          onPublish={async () => {
            const input = {
              slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
              title: name.trim(),
              symbol: symbol.trim().toUpperCase(),
              description,
              imageUrl: undefined,
              chainId: chain === 'base' ? 8453 : 1,
              artType: artType,
              creatorAddress: address || '0x0000000000000000000000000000000000000000',
            };
            const res = await fetch('/api/graphql', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                query: `mutation($input: CreateCollectionInput!) { createCollection(input: $input) { slug } }`,
                variables: { input },
              }),
            });
            const out = await res.json();
            const slug = out?.data?.createCollection?.slug;
            if (slug) router.push(`/mint/${slug}`);
          }}
        />
      )}
      <Footer />
    </div>
  );
}
