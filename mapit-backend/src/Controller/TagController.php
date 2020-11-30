<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\TagSerializer;
use App\Repository\TagRepository;

class TagController extends AbstractController
{
    /**
     * @Route("/tag", methods={"GET"})
     */
    public function index(TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse
    {
        $tags = $tagRepository->findAll();

        return new JsonResponse(
            $tagSerializer->serialize($tags),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag"), methods={"POST"}
     */
    public function create(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse {
        $tag = $tagSerializer->deserialize($request->getContent());
        $place = $tag->getPlaces();

        $tagRepository->save($tag); 

/*         $em = $this->getDoctrine()->getManager();
        $em->persist($tag);
        $em->persist($place);
        $em->flush();
 */
        return new JsonResponse(
            $tagSerializer->serialize($tag),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
